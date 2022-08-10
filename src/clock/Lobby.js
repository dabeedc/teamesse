import {
  Avatar,
  Box,
  List,
  ListItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom } from "../redux/slices/rooms";
import { getBaseUrl } from "../utils";

export const Lobby = ({ hidden, subjects, messages, send, loading }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const { online, selectedRoom } = useSelector((state) => state.rooms);
  const { currentUser } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null);

  const handlePopoverOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setHoveredUser(user);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredUser(null);
  };

  const ref = useRef(null);

  useEffect(() => {
    // https://bobbyhadz.com/blog/react-scroll-to-bottom
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    (async () => {
      const info = await Promise.all(
        subjects.map(async ({ users }) => {
          return Promise.all(
            users.map(async (user) => {
              const { info } = await getAvatar(user);
              return { user, info };
            })
          );
        })
      );
      setUserInfo(
        info.flat(Infinity).reduce((result, { user, info }) => {
          result[user] = info;
          return result;
        }, {})
      );
    })();
  }, [subjects]);

  const getAvatar = async (user) => {
    const res = await fetch(`${getBaseUrl()}/profile/info/${user}`);
    const json = await res.json();
    return json;
  };

  return (
    online && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "95.5%",
          borderRadius: "10px",
          p: 2,
          m: 2,
          backgroundColor: "common.fifth",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {online &&
            subjects.map(({ subject, users, timer }) => (
              <Box key={subject}>
                <Typography
                  fontSize="15px"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: (theme) => theme.palette.common.third,
                      color: "white",
                    },
                    backgroundColor: (theme) =>
                      subject === selectedRoom && theme.palette.common.third,
                    color: subject === selectedRoom && "white",
                    borderRadius: "5px",
                    py: "2px",
                    px: "5px",
                    mr: 2,
                  }}
                  onClick={() => {
                    if (selectedRoom === subject) {
                      dispatch(setSelectedRoom(null));
                    } else {
                      dispatch(setSelectedRoom(subject));
                    }
                  }}
                >
                  {subject}{" "}
                  {timer?.mode === "focus" &&
                    timer?.state !== "stopped" &&
                    "🍅"}
                  {timer?.mode === "break" &&
                    timer?.state !== "stopped" &&
                    "☕"}
                </Typography>
                <List dense={true} sx={{ m: -0.5 }}>
                  {users.map((user, i) => (
                    <ListItem
                      key={`${user}-${i}`}
                      onMouseEnter={(e) => handlePopoverOpen(e, user)}
                      onMouseLeave={handlePopoverClose}
                    >
                      <Avatar
                        alt={user}
                        sx={{ width: 18, height: 18 }}
                        src={
                          currentUser.username === user
                            ? currentUser.avatar
                            : userInfo[user]?.avatar
                        }
                      />
                      <Typography sx={{ ml: 1, fontSize: "small" }}>
                        {user}
                      </Typography>
                      <Popover
                        id="mouse-over-popover"
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={Boolean(anchorEl) && hoveredUser === user}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Box
                          sx={{
                            m: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            alt={user}
                            sx={{ width: 80, height: 80 }}
                            src={userInfo[user]?.avatar}
                          />
                          <Box sx={{ ml: 2 }}>
                            <Typography sx={{ fontSize: "x-large" }}>
                              {userInfo[user]?.name}
                            </Typography>
                            <Typography sx={{ fontSize: "small" }}>
                              {userInfo[user]?.pomodoros?.length ?? 0} pomodoros
                              completed
                            </Typography>
                            <Typography sx={{ fontSize: "small" }}>
                              {Math.round(
                                userInfo[user]?.pomodoros?.reduce(
                                  (result, curr) => (result += curr.duration),
                                  0
                                ) / 60
                              ) ?? 0}{" "}
                              minutes focused
                            </Typography>
                          </Box>
                        </Box>
                      </Popover>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
        </Box>
        {selectedRoom && (
          <Box
            className={`animate ${hidden ? "hide" : "show"}`}
            sx={{
              height: "100%",
              maxHeight: "630px",
              display: "flex",
              flexDirection: "column",
              borderLeft: `1px solid`,
              borderColor: "common.second",
              alignItems: "center",
              width: "300px",
              mr: -2,
              overflowY: "scroll",
            }}
          >
            <Typography variant="h4">{selectedRoom}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
              }}
            >
              {messages.map(({ message, sender }, i) =>
                sender === "server" ? (
                  <Typography
                    key={i}
                    sx={{
                      fontStyle: "italic",
                      fontSize: "12px",
                      my: 0.5,
                      color: "common.first",
                    }}
                  >
                    {sender}: {message}
                  </Typography>
                ) : (
                  <Typography
                    key={i}
                    sx={{
                      alignSelf:
                        currentUser?.username === sender
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {sender}: {message}
                  </Typography>
                )
              )}
            </Box>
            <Box sx={{ flexGrow: 1 }} ref={ref} />
            <TextField
              label="Message..."
              sx={{
                mt: 2,
                width: "90%",
                backgroundColor: "common.third",
                borderRadius: "5px",
                position: "sticky",
                bottom: 0,
                mb: "1px",
              }}
              size="small"
              value={inputMessage}
              InputLabelProps={{
                style: { color: "white" },
                shrink: !!inputMessage,
              }}
              inputProps={{ style: { color: "white" } }}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send(inputMessage);
                  setInputMessage("");
                }
              }}
            />
          </Box>
        )}
      </Box>
    )
  );
};

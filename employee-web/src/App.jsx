import React, { useRef, useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./App.css";
import useLoadMoreOnScroll from "react-hook-pagination";
import { For } from "react-for-loop";

function Loader() {
  return (
    <div>
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="text" height={120} />
    </div>
  );
}
function App() {
  const scroller = useRef();
  const [data, setData] = useState([]);
  const {
    start,
    end,
    isFetching,
    doneFetching,
    setIsFetching,
    forceDonefetching
  } = useLoadMoreOnScroll({ fetchSize: 20, scroller: scroller, limit: 1000 });

  const fetchEmployees = async (start, end) => {
    const size = end - start;
    const page = end / size;
    const response = await fetch(
      `http://localhost:8080/employee?size=${size}&page=${page}`
    );
    const res = await response.json();
    if (res.page.totalPages <= page) {
      forceDonefetching();
    }
    return res._embedded.employee;
  };
  useEffect(() => {
    if (start !== end) {
      setIsFetching(true);
      fetchEmployees(start, end).then(employees => {
        setData([...data, ...employees]);
        setIsFetching(false);
      });
    }
  }, [start, end]);
  const getInitials = (fn, ln) => fn.substring(0, 1) + ln.substring(0, 1);
  return (
    <div className="App">
      <Typography variant="h2">Employees</Typography>
      <List ref={scroller}>
        <For
          data={data}
          itemRenderer={(emp, idx) => (
            <ListItem key={idx} button>
              <ListItemIcon>
                <Avatar>{getInitials(emp.firstName, emp.lastName)}</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${emp.firstName} ${emp.lastName}`}
              ></ListItemText>
            </ListItem>
          )}
        ></For>
        {isFetching && <Loader />}
        {doneFetching && <Typography variant="h4">Thats All!</Typography>}
      </List>
    </div>
  );
}

export default App;

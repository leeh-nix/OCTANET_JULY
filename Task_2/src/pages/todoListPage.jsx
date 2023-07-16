import React, { useEffect, useState } from "react";
import { Typography, List, Row, Col, Form, Input, Button, Select } from "antd";
import Todo from "../components/todo";
import {
  collection,
  onSnapshot,
  where,
  query,
  updateDoc,
  arrayUnion,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const { Title } = Typography;
const { Option } = Select;

function TodoListPage({ user }) {
  const [todosArr, setTodosArr] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const userDocRef = query(
      collection(db, "users"),
      where("uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(userDocRef, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push(...doc.data().todos);
      });
      setTodosArr(todos);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddTask = async (values) => {
    const newTodo = {
      text: values.task,
      priority: values.priority,
    };

    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = doc(
          collection(db, "users"),
          querySnapshot.docs[0].id
        );
        updateDoc(userDocRef, {
          todos: arrayUnion(newTodo),
        });
      } else {
        console.log("No user found with the given uid");
      }
      console.log("Task added with ID: ", docRef.id);
      form.resetFields();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        // flexDirection: "column",
        padding: "24px",
        // alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* <Row
        gutter={24}
        style={{
          minHeight: "100%",
        }}
      > */}
      <Col
        span={8}
        style={{
          // minHeight: "100%",
          minWidth: "50%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ padding: "24px", width: "100%" }}>
          <Title
            level={3}
            style={{  textAlign: "center", marginBottom: "24px" }}
          >
            Todo List
          </Title>
          <List
            dataSource={todosArr}
            renderItem={(todo, index) => (
              <List.Item key={index}>
                <Todo todo={todo} user={user} />
              </List.Item>
            )}
          />
        </div>
      </Col>
      <Col
        span={8}
        style={{
          // minHeight: "100%",
          minWidth: "50%",
          // display: "flex",
          // flexDirection: "column",
          marginRight: "0px",
          padding: "24px",
        }}
      >
        <div style={{ padding: "24px" }}>
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Add Task
          </Title>
          <Form form={form} onFinish={handleAddTask}>
            <Form.Item
              name="task"
              rules={[{ required: true, message: "Please enter a task" }]}
            >
              <Input placeholder="Enter Task" />
            </Form.Item>
            <Form.Item
              name="priority"
              rules={[{ required: true, message: "Please select a priority" }]}
            >
              <Select placeholder="Select Priority">
                <Option value={1}>Low</Option>
                <Option value={2}>Medium</Option>
                <Option value={3}>High</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Task
            </Button>
          </Form>
        </div>
      </Col>
      {/* </Row> */}
    </div>
  );
}

export default TodoListPage;

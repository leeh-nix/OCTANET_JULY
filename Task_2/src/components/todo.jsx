import React from "react";
import { Card, Typography, Tooltip } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { red, yellow, green } from "@ant-design/colors";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const { Meta } = Card;
const { Text } = Typography;

const Todo = ({ todo, user }) => {
  let priorityColor;
  let priorityText;
  switch (todo.priority) {
    case 3:
      priorityColor = red.primary;
      priorityText = "High";
      break;
    case 2:
      priorityColor = yellow.primary;
      priorityText = "Medium";
      break;
    case 1:
      priorityColor = green.primary;
      priorityText = "Low";
      break;
    default:
      priorityColor = red.primary;
      priorityText = "Error";
      break;
  }

  async function handleDelete() {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDocRef = doc(collection(db, "users"), querySnapshot.docs[0].id);
      updateDoc(userDocRef, {
        todos: arrayRemove(todo),
      });
    } else {
      console.log("No user found with the given uid");
    }
  }

  return (
    <Card
      style={{
        
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      hoverable
      actions={[
        <Tooltip title={priorityText} key="priority">
          <ExclamationCircleOutlined style={{ color: priorityColor }} />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <DeleteOutlined onClick={handleDelete} />
        </Tooltip>,
      ]}
    >
      <Meta
        title={
          <Text type="secondary" ellipsis>
            {todo.text}
          </Text>
        }
      />
    </Card>
  );
};

export default Todo;

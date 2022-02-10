import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function ToDo() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Buy 1kg tomato",
    },
    {
      id: 2,
      title: "Buy 2kg onion",
    },
    {
      id: 3,
      title: "clean the house",
    },
    {
      id: 4,
      title: "visit friend",
    },
  ]);

  const [completed, setCompleted] = useState([
    {
      id: 5,
      title: "go for walk",
    },
    {
      id: 6,
      title: "make the dinner",
    },
    {
      id: 7,
      title: "washing cloths",
    },
  ]);

  const [newTask, setNewTask] = useState(" ");
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(completed.length + tasks.length);
  }, []);

  const deleteTask = (id) => {
    let new_List = tasks.filter((task) => task.id !== id);
    setTasks(new_List);
  };

  const deleteCompleted = (id) => {
    let new_List = completed.filter((task) => task.id !== id);
    setCompleted(new_List);
  };

  const completeTask = (id) => {
    let current_task = tasks.find((task) => task.id === id);
    setCompleted([...completed, current_task]);
    let new_List = tasks.filter((task) => task.id !== id);
    setTasks(new_List);
  };

  const revertTask = (id) => {
    let current_task = completed.find((task) => task.id === id);
    setTasks([...tasks, current_task]);
    let new_List = completed.filter((task) => task.id !== id);
    setCompleted(new_List);
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <ListItems key={task.id}>
        <LeftContainer onClick={() => completeTask(task.id)}>
          <CheckContainer></CheckContainer>
          <ItemContent>
            {task.id}, {task.title}
          </ItemContent>
        </LeftContainer>
        <RightContainer>
          <ActionButton onClick={() => deleteTask(task.id)}>
            <ButtonImage
              src={require("./assets/delete.svg").default}
              alt="Delete"
            />
          </ActionButton>
        </RightContainer>
      </ListItems>
    ));
  };

  const renderCompleted = () => {
    return completed.map((task) => (
      <ListItems key={task.id}>
        <LeftContainer>
          <CheckContainerCompleted>
            <TickImage
              src={require("./assets/tick-green.svg").default}
              alt="Tick"
            />
          </CheckContainerCompleted>
          <ItemContentCompleted>
            {task.id}, {task.title}
          </ItemContentCompleted>
        </LeftContainer>
        <RightContainer>
          <ActionButton onClick={() => revertTask(task.id)}>
            <ButtonImage
              src={require("./assets/revert.svg").default}
              alt="Revert"
            />
          </ActionButton>
          <ActionButton onClick={() => deleteCompleted(task.id)}>
            <ButtonImage
              src={require("./assets/delete.svg").default}
              alt="Delete"
            />
          </ActionButton>
        </RightContainer>
      </ListItems>
    ));
  };

  const addNewTask = (event) => {
    event.preventDefault();
    let new_task = {
      id: itemCount + 1,
      title: newTask,
    };
    setTasks([...tasks, new_task]);
    setNewTask("");
    setItemCount((prev) => prev + 1);
  };

  return (
    <>
      <Container>
        <Heading>ToDo List</Heading>
        <ToDoContainer>
          <SubHeading>Things To be Done</SubHeading>
          <ToDoList>{renderTasks()}</ToDoList>
        </ToDoContainer>
        <NewToDoForm>
          <FormInput
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add New Task..." 
            />
          <FormSubmitButton onClick={(e) => addNewTask(e)}>
            Add New
          </FormSubmitButton>
        </NewToDoForm>
        <ToDoContainer>
          <SubHeading>Things To be Done</SubHeading>
          <ToDoList>{renderCompleted()}</ToDoList>
        </ToDoContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 90%auto;
  max-width: 1000px;
  padding: 50px 10%;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  margin: 0 auto;
  min-height: 100vh;
`;
const Heading = styled.h1`
  font-size: 52px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;
const ToDoContainer = styled.div``;
const SubHeading = styled.h3`
  font-size: 36px;
  color: #050241;
`;
const ToDoList = styled.ul``;
const ListItems = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CheckContainer = styled.span`
  width: 32px;
  height: 32px;
  border: 2px solid #050241;
  border-radius: 50%;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
`;
const ItemContent = styled.span`
  font-size: 28px;
  cursor: pointer;
`;
const RightContainer = styled.div``;
const ActionButton = styled.button`
  border: none;
  background: none;
  curser: pointer;
  margin-right: 20px;
  outline: none;
  &:last-child {
    margin-right: 0;
  }
`;
const ButtonImage = styled.img``;
const NewToDoForm = styled.form`
    display:flex;
    margin-left:40px;
    margin-top:30px;
    position: relative; 
    &::before{
        content:"";
        background-image:url(${require("./assets/plus.svg").default});
        width:16px;
        height:16px;
        display:block;
        position:absolute;
        left:10px;
        top:0;
        bottom:0;
        margin auto 0;
        z-index:2;
    }
`;
const FormInput = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: 1px solid #c6c6c6;
  border-right: none;
  padding: 0 10px 0 35px;
  font-size: 22px;
  color: #000;
`;
const FormSubmitButton = styled.button`
  padding: 15px 25px;
  white-space: nowrap;
  border: none;
  background: #050241;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 24px;
`;
const CheckContainerCompleted = styled(CheckContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #06c692;
`;
const ItemContentCompleted = styled(ItemContent)`
  color: #06c692;
`;
const TickImage = styled.img``;

import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

export default class MenuExampleHeaderVertical extends Component {
  //   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleItemClick = (e, { name }) => {
    console.log(name);
  };
  render() {
    const {
      onVisualizePressed,
      onClearPathPressed,
      switchActiveItem,
      activeItem,
    } = this.props;

    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Graphs</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="BFS"
              active={activeItem === "BFS"}
              onClick={() => switchActiveItem("BFS")}
            />
            <Menu.Item
              name="Graph DFS"
              active={activeItem === "DFS"}
              onClick={() => switchActiveItem("DFS")}
            />
            <Menu.Item
              name="Dijkstra"
              active={activeItem === "Dijkstra"}
              onClick={() => switchActiveItem("Dijkstra")}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Button
            onClick={() => onVisualizePressed()}
            color="teal"
            floated="left"
            size="small"
          >
            Visualize
          </Button>
          <Button
            onClick={() => onClearPathPressed()}
            color="grey"
            size="small"
          >
            Clear
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}

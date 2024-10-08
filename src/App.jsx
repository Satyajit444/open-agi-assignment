import React, { useRef, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { DnDProvider, useDnD } from "./components/context/DndContext";
import Sidebar from "./components/shared/Sidebar";
import Navbar from "./components/shared/Navbar";
import { FormProvider } from "./components/context/FormContext";
import { Input } from "./components/Input";
import { Output } from "./components/Output";
import { LLMEngine } from "./components/LLMEngine";
import { ToastProvider } from "./components/context/ToastContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  // onConnect to handle adding edges
  const onConnect = useCallback((params) => {
    // Find the source and target nodes based on their IDs
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);
  
    // Validate connections: input -> LLM, and LLM -> output
    if (
      (sourceNode.type === "input" && targetNode.type === "default") || // input can connect to default
      (sourceNode.type === "default" && targetNode.type === "output") // llm can connect to output
    ) {
      // Valid connection, add the edge
      setEdges((eds) => addEdge(params, eds));
    } else {
      // Invalid connection, block the edge
    }
  }, [nodes]);
  

  // onDragOver to allow dropping nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // onDrop to handle dropped node creation
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      // Check if valid type is being dragged
      if (!type) {
        return;
      }

      // Calculate position and create new node
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });


      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: (() => {
            if (type === "input") {
              return <Input />;
            } else if (type === "output") {
              return <Output />;
            } else {
              return <LLMEngine />;
            }
          })(),
        },
      };

      // Add new node to nodes state
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="mt-20 dndflow">
        <Sidebar />
        <div style={{ width: "100vw", height: "90vh" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <ToastProvider>
      <FormProvider>
        <DnDProvider>
          <App />
        </DnDProvider>
      </FormProvider>
    </ToastProvider>
  </ReactFlowProvider>
);

import React, { useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { animated, to } from "@react-spring/web";

const l = (x) => {
  console.log(x);
  return x;
};

const Report = ({ name }) => {
  switch (name) {
    case "network":
      return <Network />;
    case "circle":
      return <Circle />;
    case "sunburst":
      return <Sunburst />;
    case "treemap":
      return <Treemap />;
    default:
      return <div>Error</div>;
  }
};

export const OtherReports = () => {
  const [report, setReport] = useState("network");

  return (
    <div className="flex space-between margin-xl h-full">
      <div className="flex flex-column align-start gap-s">
        <button type="button" onClick={() => setReport("network")}>
          network
        </button>
        <button type="button" onClick={() => setReport("circle")}>
          circle packing
        </button>
        <button type="button" onClick={() => setReport("sunburst")}>
          sunburst
        </button>
        <button type="button" onClick={() => setReport("treemap")}>
          treemap
        </button>
      </div>
      <Report name={report} />
    </div>
  );
};

const networkData = {
  nodes: [
    {
      id: "اداره برنامه ریزی",
      size: 100,
      color: "green",
    },
    {
      id: "مدیر امور استانهای شمال کشور",
      size: 50,
      color: "green",
    },
    {
      id: "مدیر امور استانهای مرکز کشور",
      size: 50,
      color: "yellow",
    },
    {
      id: "مدیر امور استانهای جنوب کشور",
      size: 50,
      color: "red",
    },
    {
      id: "آذربایجان شرقی",
      size: 20,
      color: "green",
    },
    {
      id: "آذربایجان غربی",
      size: 20,
      color: "green",
    },
    {
      id: "اردبیل",
      size: 20,
      color: "green",
    },
    {
      id: "خراسان رضوی",
      size: 20,
      color: "green",
    },
    {
      id: "خراسان شمالی",
      size: 20,
      color: "green",
    },
    {
      id: "خراسان جنوبی",
      size: 20,
      color: "green",
    },
    {
      id: "کردستان",
      size: 20,
      color: "red",
    },
    {
      id: "گلستان",
      size: 20,
      color: "green",
    },
    {
      id: "گیلان",
      size: 20,
      color: "green",
    },
    {
      id: "مازندران",
      size: 20,
      color: "green",
    },
    {
      id: "فارس",
      size: 20,
      color: "red",
    },
  ],
  links: [
    {
      source: "اداره برنامه ریزی",
      target: "مدیر امور استانهای شمال کشور",
      distance: 140,
    },
    {
      source: "اداره برنامه ریزی",
      target: "مدیر امور استانهای مرکز کشور",
      distance: 140,
    },
    {
      source: "اداره برنامه ریزی",
      target: "مدیر امور استانهای جنوب کشور",
      distance: 140,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "آذربایجان شرقی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "آذربایجان شرقی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "آذربایجان غربی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "اردبیل",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "گلستان",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "گیلان",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای شمال کشور",
      target: "مازندران",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای مرکز کشور",
      target: "خراسان رضوی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای مرکز کشور",
      target: "خراسان شمالی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای مرکز کشور",
      target: "خراسان جنوبی",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای مرکز کشور",
      target: "کردستان",
      distance: 70,
    },
    {
      source: "مدیر امور استانهای جنوب کشور",
      target: "فارس",
      distance: 35,
    },
  ],
};

const NetworkNode = (props) => {
  const animatedProps = props.animated;
  const textLength = props.node.id.length * 8;
  const scale = (props.node.size - 10) / textLength;
  l(animatedProps);

  return (
    <animated.g
      transform={to(
        [animatedProps.x, animatedProps.y, animatedProps.scale],
        (x, y, scale) => {
          return `translate(${x},${y}) scale(${scale})`;
        }
      )}
      onMouseEnter={(ev) => props.onMouseEnter?.(props.node, ev)}
      onMouseLeave={(ev) => props.onMouseLeave?.(props.node, ev)}
      onMouseMove={(ev) => props.onMouseMove?.(props.node, ev)}
      onClick={(ev) => props.onClick?.(props.node, ev)}
    >
      <animated.circle
        r={to([animatedProps.size], (size) => size / 2)}
        fill={animatedProps.color}
        strokeWidth={animatedProps.borderWidth}
        stroke={animatedProps.borderColor}
        opacity={animatedProps.opacity}
        stroke="black"
      />
      <animated.text
        text-anchor="middle"
        transform={to(
          [animatedProps.size],
          (size) => `scale(${(size - 10) / textLength})`
        )}
      >
        {props.node.id}
      </animated.text>
    </animated.g>
  );
};

function Network() {
  return (
    <ResponsiveNetwork
      data={networkData}
      linkDistance={(e) => e.distance}
      centeringStrength={0.3}
      repulsivity={100}
      nodeSize={(n) => n.size}
      activeNodeSize={(n) => 1.5 * n.size}
      nodeColor={(e) => e.color}
      nodeComponent={NetworkNode}
      nodeBorderWidth={1}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.8]],
      }}
      linkThickness={(edge) => l(edge).data.size ?? 2}
      linkBlendMode="multiply"
      motionConfig="wobbly"
    />
  );
}

const circleData = {
  name: "اداره برنامه ریزی",
  color: "hsl(226, 70%, 50%)",
  children: [
    {
      name: "مدیر امور استانهای شمال کشور",
      color: "hsl(115, 70%, 50%)",
      children: [
        {
          name: "کردستان",
          color: "hsl(136, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(147, 70%, 50%)",
              loc: 80616,
            },
            {
              name: "xAxis",
              color: "hsl(111, 70%, 50%)",
              loc: 20309,
            },
          ],
        },
        {
          name: "مازندران",
          color: "hsl(191, 70%, 50%)",
          loc: 10000,
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(190, 70%, 50%)",
      children: [
        {
          name: "فارس",
          color: "hsl(271, 70%, 50%)",
          loc: 46856,
        },
        {
          name: "گلستان",
          color: "hsl(238, 70%, 50%)",
          loc: 12504,
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(190, 70%, 50%)",
      children: [
        {
          name: "فارس",
          color: "hsl(271, 70%, 50%)",
          loc: 46856,
        },
        {
          name: "گیلان",
          color: "hsl(238, 70%, 50%)",
          loc: 12504,
        },
      ],
    },
  ],
};

function Circle() {
  return (
    <ResponsiveCirclePacking
      data={circleData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      value="loc"
      colors={{ scheme: "nivo" }}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      padding={4}
      enableLabels={true}
      labelsFilter={function (n) {
        return 2 === n.node.depth;
      }}
      labelsSkipRadius={10}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.5]],
      }}
    />
  );
}

const sunData = {
  name: "nivo",
  color: "hsl(124, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(247, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(110, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(95, 70%, 50%)",
              loc: 113200,
            },
            {
              name: "xAxis",
              color: "hsl(21, 70%, 50%)",
              loc: 24751,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(236, 70%, 50%)",
          loc: 10000,
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(164, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(160, 70%, 50%)",
          loc: 141328,
        },
        {
          name: "hsl",
          color: "hsl(191, 70%, 50%)",
          loc: 91480,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(190, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(198, 70%, 50%)",
          loc: 89056,
        },
      ],
    },
  ],
};

function Sunburst() {
  return (
    <ResponsiveSunburst
      data={sunData}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      id="name"
      value="loc"
      cornerRadius={2}
      borderColor={{ theme: "background" }}
      colors={{ scheme: "nivo" }}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.1]],
      }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 1.4]],
      }}
    />
  );
}

const treeData = {
  name: "nivo",
  color: "hsl(143, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(56, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(192, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(349, 70%, 50%)",
              loc: 45436,
            },
            {
              name: "xAxis",
              color: "hsl(186, 70%, 50%)",
              loc: 110960,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(298, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(26, 70%, 50%)",
              loc: 20000,
            },
            {
              name: "legends",
              color: "hsl(270, 70%, 50%)",
              loc: 164368,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(256, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(62, 70%, 50%)",
          loc: 89483,
        },
        {
          name: "hsl",
          color: "hsl(71, 70%, 50%)",
          loc: 64177,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(198, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(54, 70%, 50%)",
          loc: 114377,
        },
      ],
    },
  ],
};

function Treemap() {
  return (
    <ResponsiveTreeMap
      data={treeData}
      identity="name"
      value="loc"
      valueFormat=".02s"
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      labelSkipSize={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.2]],
      }}
      parentLabelPosition="left"
      parentLabelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.1]],
      }}
    />
  );
}

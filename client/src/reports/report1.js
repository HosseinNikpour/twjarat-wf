import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import '../assets/css/chart.css';  // contains .diagram-component CSS
const Report1 = (props) => {

    function initDiagram() {
        const $ = go.GraphObject.make;
        // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
        const diagram =
            $(go.Diagram,
                {
                    'undoManager.isEnabled': true,  // must be set to allow for model change listening
                    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                    'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                    model: new go.GraphLinksModel(
                        {
                            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                        })
                });

        // define a simple Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',  // the Shape will go around the TextBlock
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle',
                    { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    { margin: 8, editable: true },  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );

        return diagram;
    }

    function handleModelChange(changes) {
       // alert('GoJS model changed!');
     //  debugger;
    }


    return (
        <div> 

            report
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={[
                    { key: 0, text: 'اداره برنامه ریزی', color: 'green', loc: '330 0' },
                    { key: 1, text: 'مدیر امور استان های شمال کشور ', color: 'green', loc: '50 100' },
                    { key: 2, text: 'مدیر امور استان های مرکز کشور ', color: 'yellow', loc: '300 100' },
                    { key: 3, text: 'مدیر امور استان های جنوب کشور', color: 'gray', loc: '650 100' },
                    { key: 4, text: 'آذربایجان شرقی', color: 'green', loc: '50 200' },
                    { key: 5, text: 'آذربایجان غربی ', color: 'green', loc: '50 240' },
                    { key: 6, text: 'اردبیل', color: 'gray', loc: '50 280' },
                    { key: 7, text: 'خراسان رضوی', color: 'green', loc: '50 320' },
                    { key: 8, text: 'خراسان شمالی', color: 'green', loc: '50 360' },
                    { key: 9, text: 'خراسان جنوبی', color: 'gray', loc: '50 400' },
                    { key: 10, text: 'کردستان', color: 'gray', loc: '50 440' },
                    { key: 11, text: 'گلستان', color: 'gray', loc: '50 480' },
                    { key: 12, text: 'گیلان', color: 'gray', loc: '50 520' },
                    { key: 13, text: 'مازندران', color: 'green', loc: '50 560' },
                ]}
                linkDataArray={[
                    { key: -1, from: 0, to: 1 },
                    { key: -2, from: 0, to: 2 },
                    { key: -3, from: 1, to: 4 },
                    { key: -4, from: 0, to: 3 },
                   // { key: -5, from: 1, to: 5 },
                    // { key: -6, from: 1, to: 6 },
                    // { key: -7, from: 1, to: 7 },
                    // { key: -8, from: 1, to: 8 },
                    // { key: -9, from: 1, to: 9 },
                    // { key: -10, from: 1, to: 10 },
                    // { key: -11, from: 1, to: 11 },
                ]}
                onModelChange={handleModelChange}
            />

        </div>
    );
}

export default Report1;
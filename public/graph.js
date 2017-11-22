
function resp() {

    $.ajax({
        url: "/act",
        dataType: "json",
        success: function (jsonData) {
            console.log(typeof jsonData)

            let $ = go.GraphObject.make;
            // const a = require('./bestchar.js');
            // console.log(a);
            let myDiagram = $(go.Diagram, "myDiagramDiv",
                {
                    initialContentAlignment: go.Spot.Center, // center Diagram contents
                    "undoManager.isEnabled": true,
                      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 500 }) // enable Ctrl-Z to undo and Ctrl-Y to redo
                });

            myDiagram.nodeTemplate =
                $(go.Node, "Horizontal",
                    // the entire node will have a light-blue background
                    { background: "#c4dbc1" },
                    // $(go.Picture,
                    //   // Pictures should normally have an explicit width and height.
                    //   // This picture has a red background, only visible when there is no source set
                    //   // or when the image is partially transparent.
                    //   { margin: 10, width: 50, height: 50, background: "red" },
                    //   // Picture.source is data bound to the "source" attribute of the model data
                    //   new go.Binding("source")),
                    $(go.TextBlock,
                        "Default Text",  // the initial value for TextBlock.text
                        // some room around the text, a larger font, and a white stroke:
                        { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                        // TextBlock.text is data bound to the "name" attribute of the model data
                        new go.Binding("text", "name"))
                );

            let model = $(go.TreeModel);

            model.nodeDataArray = jsonData;

            myDiagram.model = model;
        }
    });
}

// $(window).resize(function () {
//     resp();
// });
resp();

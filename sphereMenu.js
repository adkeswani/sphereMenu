var SQRT2 = Math.sqrt(2);
var SQRT3 = Math.sqrt(3);
var TETRA_Q = SQRT2 / 3;
var TETRA_R = 1.0 / 3;
var TETRA_S = SQRT2 / SQRT3;
var TETRA_T = 2 * SQRT2 / 3;
var GOLDEN_MEAN = (Math.sqrt(5) + 1) / 2;

var primitives = 
[
    // Tetrahedron
    {numEdges: 6, numFaces: 4, vertices:
        [ 
            [ -TETRA_S, -TETRA_Q, -TETRA_R ], 
            [ TETRA_S, -TETRA_Q, -TETRA_R ], 
            [ 0, TETRA_T, -TETRA_R ], 
            [ 0, 0, 1 ] 
        ] 
    },

    // Octahedron
    {numEdges: 12, numFaces: 8, vertices:
        [
            [ 0, 0, 1 ],
            [ 1, 0, 0 ],
            [ 0, -1, 0 ],
            [ -1, 0, 0 ],
            [ 0, 1, 0 ],
            [ 0, 0, -1 ]
        ]
    },

    // Icosahedron
    {numEdges: 30, numFaces: 20, vertices:
        [
            [ 1, GOLDEN_MEAN, 0 ],
            [ 1, -GOLDEN_MEAN, 0 ],
            [ -1, -GOLDEN_MEAN, 0 ],
            [ -1, GOLDEN_MEAN, 0 ],
            [ GOLDEN_MEAN, 0, 1 ],
            [ -GOLDEN_MEAN, 0, 1 ],
            [ -GOLDEN_MEAN, 0, -1 ],
            [ GOLDEN_MEAN, 0, -1 ],
            [ 0, 1, GOLDEN_MEAN ],
            [ 0, 1, -GOLDEN_MEAN ],
            [ 0, -1, -GOLDEN_MEAN ],
            [ 0, -1, GOLDEN_MEAN ]
        ]
    }
];

// Returns the vertices of a geodesic dome that has closest to the number
// of vertices required without having less than required
function getSphereVertices(minVerticesRequired) 
{
    // Find out which primitive and frequency 
    var closest = {difference: minVerticesRequired, frequency: 0, index: -1};
    for (primitive = 0; primitive < primitives.length; primitive++)
    {
        // http://phrogz.net/CSS/Geodesics/index.html#step4
        // Number of vertices =
        // number of vertices primitive already has + 
        // number of vertices created on each edge of the primitive +
        // number of vertices created by intersections between lines through each face
        var numIntersectionVerticesPerFace = 0;
        var frequency = 1;
        var numEdgeVertices = frequency * primitives[primitive].numEdges;
        var numVertices = primitives[primitive].vertices.length + numEdgeVertices + numIntersectionVerticesPerFace * primitives[primitive].numFaces;
        while (numVertices < minVerticesRequired)
        {
            numIntersectionVerticesPerFace += frequency; // Triangular numbers
            frequency++;
            numEdgeVertices = frequency * primitives[primitive].numEdges;
            numVertices = primitives[primitive].vertices.length + numEdgeVertices + numIntersectionVerticesPerFace * primitives[primitive].numFaces;
        }
       
        var difference = numVertices - minVerticesRequired;
        if (difference < closest.difference)
        {
            closest.numVertices = numVertices; 
            closest.difference = difference;
            closest.frequency = frequency;
            closest.index = primitive;
        }
    }

    return closest;
}

var SQRT2 = Math.sqrt(2);
var SQRT3 = Math.sqrt(3);
var TETRA_Q = SQRT2 / 3;
var TETRA_R = 1.0 / 3;
var TETRA_S = SQRT2 / SQRT3;
var TETRA_T = 2 * SQRT2 / 3;
var GOLDEN_MEAN = (Math.sqrt(5) + 1) / 2;

float[][][] primitives = 
{
    // Tetrahedron
    { 
        { -TETRA_S, -TETRA_Q, -TETRA_R }, 
        { TETRA_S, -TETRA_Q, -TETRA_R }, 
        { 0, TETRA_T, -TETRA_R }, 
        { 0, 0, 1 } 
    },
    // Octahedron
    {
        { 0, 0, 1 },
        { 1, 0, 0 },
        { 0, -1, 0 },
        { -1, 0, 0 },
        { 0, 1, 0 },
        { 0, 0, -1 }
    },
    // Icosahedron
    {
        { 1, GOLDEN_MEAN, 0 },
        { 1, -GOLDEN_MEAN, 0 },
        { -1, -GOLDEN_MEAN, 0 },
        { -1, GOLDEN_MEAN, 0 },
        { GOLDEN_MEAN, 0, 1 },
        { -GOLDEN_MEAN, 0, 1 },
        { -GOLDEN_MEAN, 0, -1 },
        { GOLDEN_MEAN, 0, -1 },
        { 0, 1, GOLDEN_MEAN },
        { 0, 1, -GOLDEN_MEAN },
        { 0, -1, -GOLDEN_MEAN },
        { 0, -1, GOLDEN_MEAN }
    }
}

// Returns the vertices of a geodesic dome that has closest to the number
// of vertices required without having less than required
function getSphereVertices(minVerticesRequired) 
{
    // Find out which primitive and frequency 
    var closest = {vertices: minVerticesRequired, frequency: 0};
    for (primitive = 0; primitive < primitives.length; primitive++)
    {
        // I'm sure there's a more mathematically pretty way to do this
        int numVertices = primitive.length;
        int frequency = 0;
        while (numVertices < minVerticesRequired)
        {
            frequency++;
            numVertices += frequency + 2;
        }

        if (numVertices - minVerticesRequired < closest)
        {
            closest.vertices = numVertices;
            closest.frequency = frequency;
        }
    }
}

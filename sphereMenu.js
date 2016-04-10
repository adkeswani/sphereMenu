var INCREMENT = Math.PI * (3 - Math.sqrt(5));

function getFibonacciSpherePoints(numPoints)
{
    var points = [];
    var offset = 2.0 / numPoints;

    for (var i = 0; i < numPoints; i++)
    {
        var y = (i * offset) - 1 + (offset / 2);
        var r = Math.sqrt(1 - Math.pow(y, 2));
        var phi = (i % numPoints) * INCREMENT;
        var x = Math.cos(phi) * r;
        var z = Math.sin(phi) * r;
        points.push([x, y, z]);
    }

    return points;
}

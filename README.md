# gpx_cycling_path_generator

To run this script you need node.js installed.

go to root directory and execute:

> node script generate --filename="eagle" --int="300" --disl="1000" -n="50"

    filename:   the name of file to generate
    int: segment in distance (in meters) when change altitude, this data impacts on path's lenght
    disl: altitude gain from start to finish, to obtain 1000 use 2000
    n: number of segments, path's distance will be: int x n = distance 

🌎 PATH GENERATED 🌎 confirm the path in percorsi directory

load .gpx in training app

enjoy your training!!!

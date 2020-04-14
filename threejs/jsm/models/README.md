# hi

obj files go with respective mtl or "material" file.
there are two different models and either under a subdivision surface and rounded, or not. 
The more subdivisions, the more processing power, so just something to keep in mind.

### To build gltf files

Download the binary for [this tool](https://github.com/facebookincubator/FBX2glTF) (look for the link that says "Precompiled binaries releases for Windows, Mac OS X and Linux may be found here."). Then move that binary into _this folder_ and call it `FBX2glTF`. Make it executable by running:

```
chmod 755 FBX2glTF
```

in terminal from this directory. Finally, to build a `glTF` file from a `fbx` file, do:

```
./FBX2glTF barn_1.fbx
```

which will create a `barn_1_out` folder with `barn_1.gltf` file inside of it.

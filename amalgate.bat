mkdir temp
mkdir dist

del dist\engine.js
del dist\engine-min.js

cd engine

copy /b salvation.js a.js
move a.js ..\temp
copy /b device.js b.js
move b.js ..\temp


cd core
copy /b *.js c.js
move c.js ..\..\temp

cd ..\video
copy /b *.js d.js
move d.js ..\..\temp

cd ..\..\temp

copy /b *.js engine.js
move engine.js ..\dist\engine.js
del *.js
cd ..
rmdir temp

tool\jsmin.exe < dist\engine.js > dist\engine-min.js
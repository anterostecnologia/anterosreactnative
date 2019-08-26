
# anteros-react-native

## Getting started

`$ npm install anteros-react-native --save`

### Mostly automatic installation

`$ react-native link anteros-react-native`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `anteros-react-native` and add `RNAnterosReactNative.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAnterosReactNative.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAnterosReactNativePackage;` to the imports at the top of the file
  - Add `new RNAnterosReactNativePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':anteros-react-native'
  	project(':anteros-react-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/anteros-react-native/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':anteros-react-native')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNAnterosReactNative.sln` in `node_modules/anteros-react-native/windows/RNAnterosReactNative.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Anteros.React.Native.RNAnterosReactNative;` to the usings at the top of the file
  - Add `new RNAnterosReactNativePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNAnterosReactNative from 'anteros-react-native';

// TODO: What to do with the module?
RNAnterosReactNative;
```
  

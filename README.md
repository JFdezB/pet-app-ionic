# IONIC Angular Pet Store Example

Pet App is an example of a Hybrid IONIC-Angular application

<div style="width:100%">
<img src="images/pet_list.png?raw=true"
     alt="Markdown Monster icon"
     style="width:20%; margin: 0 auto;" />
     <img src="images/pet_list_status.png?raw=true"
     alt="Markdown Monster icon"
     style="width:20%; margin: 0 auto;" />
     <img src="images/add_pet.png?raw=true"
     alt="Markdown Monster icon"
     style="width:20%; margin: 0 auto;"/>
</div>

## Installation

### Run the app

Make sure you have [nodejs](https://nodejs.org/en/) installed.

Install dependencies:
```bash
npm install
```

Install Ionic CLI
```bash
npm install -g ionic
```

Build the app
```bash
ionic build
```
Serve the app
```bash
ionic serve
```

## How to build Android APK (using capacitor module)
```bash
npx cap init
```
Add Android configuration
```bash
npx cap add android
```

Copy the build project to Android's project folder
```bash
npx cap copy
```
If you change or add capatitor modules, you have to sync the project
```bash
npx cap sync
```
Open Android's project folder and then you can build, run and deploy it with Android Studio
```bash
npx cap open android
```

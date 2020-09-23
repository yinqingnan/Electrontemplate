# my-project1

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

##### 在build文件夹内新建script的文件夹，添加installer.nsh文件 ，添加以下内容
```
; Script generated by the HM NIS Edit Script Wizard.

; HM NIS Edit Wizard helper defines custom install default dir
!macro preInit
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\electron-builder-start-exe"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\electron-builder-start-exe"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\electron-builder-start-exe"
    WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\electron-builder-start-exe"
!macroend
```
参考https://www.cnblogs.com/chengxiang123/p/11865173.html

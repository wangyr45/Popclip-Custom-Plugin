# Popclip-Custom-Plugin

自己自制的一些 Popclip 插件。

## Popclip 即刻工具（Jike Compose Autofill）

将选中的文本一键传入即刻（Jike）网页端的输入框，提升发布效率。

### 功能说明
- 在网页上选中一段文字，使用 Popclip 的「Jike」动作，即可自动把内容填入即刻 Web 的输入框。
- 结合 Tampermonkey 脚本优化输入框聚焦与文本填充体验。

### 安装与使用

1. 安装 Tampermonkey 脚本  
   打开并安装脚本：  
   https://github.com/wangyr45/Popclip-Custom-Plugin/blob/main/jike-compose-autofill.user.js  
   安装后刷新即刻页面： https://web.okjike.com/following

2. 配置 Popclip 动作  
   在 Popclip 中添加以下配置（Popclip Extension 定义）：

   ```
   #popclip
   name: Jike
   icon: iconify:simple-icons:okjike
   url: https://web.okjike.com/?text=***
   clean query: true
   ```

   图标说明：如需自定义图标，可从 https://icon-sets.iconify.design/ 选择。若未设置，默认使用 `name`。

3. 使用方法  
   - 在任意页面选中一段内容  
   - 触发 Popclip，点击「Jike」  
   - 即可自动将选中内容传入即刻输入框

### 注意事项
- 若 Popclip 不显示该动作，请确认扩展已启用且匹配当前应用场景。
- 若脚本未生效，请在 Tampermonkey 中确认脚本已启用，并重新加载即刻页面。
- 由于网页端可能更新，脚本可能需要随即刻 DOM 结构变动进行调整。

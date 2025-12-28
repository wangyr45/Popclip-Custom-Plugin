{\rtf1\ansi\ansicpg936\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww17280\viewh13200\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs36 \cf0 // ==UserScript==\
// @name         Jike Compose Autofill\
// @namespace    popclip.jike.compose\
// @version      1.1.0\
// @description  \uc0\u23558  URL \u20013 \u30340  ?text= \u21442 \u25968 \u33258 \u21160 \u20889 \u20837 \u21363 \u21051 \u32593 \u39029 \u30340 \'93\u20998 \u20139 \u20320 \u30340 \u24819 \u27861 ...\'94\u32534 \u36753 \u26694 \u65292 \u24182 \u35302 \u21457 \u36755 \u20837 \u20107 \u20214 \
// @author       you\
// @match        https://web.okjike.com/*\
// @run-at       document-idle\
// @grant        none\
// ==/UserScript==\
\
(function () \{\
  "use strict";\
\
  // 1) \uc0\u35835 \u21462  URL \u21442 \u25968 \u20013 \u30340 \u25991 \u26412 \
  const params = new URLSearchParams(window.location.search);\
  const preset = params.get("text");\
  if (!preset || preset.trim() === "") \{\
    // \uc0\u27809 \u26377 \u20256 \u25991 \u26412 \u23601 \u19981 \u20570 \u20219 \u20309 \u20107 \
    return;\
  \}\
\
  // 2) \uc0\u31561 \u24453 \u32534 \u36753 \u22120 \u28210 \u26579 \u65288 \u21363 \u21051 \u20026  SPA\u65292 \u33410 \u28857 \u20250 \u24310 \u36831 \u20986 \u29616 \u65289 \
  function waitForEditor(timeoutMs = 15000) \{\
    const start = Date.now();\
\
    return new Promise((resolve, reject) => \{\
      // \uc0\u20808 \u24555 \u36895 \u26816 \u26597 \u19968 \u27425 \
      let editor = findEditor();\
      if (editor) return resolve(editor);\
\
      // \uc0\u29992  MutationObserver \u30417 \u21548  DOM \u21464 \u21270 \u65292 \u20986 \u29616 \u21518 \u31435 \u21363 \u22635 \u20805 \
      const observer = new MutationObserver(() => \{\
        editor = findEditor();\
        if (editor) \{\
          observer.disconnect();\
          resolve(editor);\
        \}\
      \});\
\
      observer.observe(document.documentElement || document.body, \{\
        childList: true,\
        subtree: true,\
      \});\
\
      // \uc0\u36229 \u26102 \u20828 \u24213 \
      const timer = setInterval(() => \{\
        if (Date.now() - start > timeoutMs) \{\
          clearInterval(timer);\
          observer.disconnect();\
          reject(new Error("Editor not found within timeout"));\
        \} else \{\
          editor = findEditor();\
          if (editor) \{\
            clearInterval(timer);\
            observer.disconnect();\
            resolve(editor);\
          \}\
        \}\
      \}, 500);\
    \});\
  \}\
\
  // 3) \uc0\u26681 \u25454 \u24403 \u21069 \u39029 \u38754 \u32467 \u26500 \u26597 \u25214 \u32534 \u36753 \u22120 \
  function findEditor() \{\
    // \uc0\u20381 \u25454 \u24403 \u21069 \u39029 \u38754 \u25552 \u20379 \u30340 \u32467 \u26500 \u65306 contenteditable="true" \u19988  role="textbox"\
    // \uc0\u22914 \u26524 \u23558 \u26469 \u39029 \u38754 \u32467 \u26500 \u25913 \u21464 \u65292 \u21487 \u22312 \u27492 \u22788 \u34917 \u20805 \u20854 \u20182 \u36873 \u25321 \u22120 \u65288 \u20363 \u22914 \u31867 \u21517 \u25110  data- \u23646 \u24615 \u65289 \
    const editor =\
      document.querySelector("div[contenteditable='true'][role='textbox']") ||\
      document.querySelector("[contenteditable='true']");\
\
    return editor || null;\
  \}\
\
  // 4) \uc0\u23558 \u32431 \u25991 \u26412 \u23433 \u20840 \u20889 \u20837 \u32534 \u36753 \u22120 \u65292 \u24182 \u35302 \u21457 \u36755 \u20837 \u20107 \u20214 \
  function fillEditor(editor, text) \{\
    if (!editor) return;\
\
    // \uc0\u32858 \u28966 \u21040 \u32534 \u36753 \u22120 \
    editor.focus();\
\
    // \uc0\u20351 \u29992  Selection/Range \u23450 \u20301 \u25554 \u20837 \u28857 \u65288 \u26411 \u23614 \u65289 \u65292 \u20860 \u23481  React/\u21463 \u25511 \u32452 \u20214 \
    const selection = window.getSelection();\
    const range = document.createRange();\
    range.selectNodeContents(editor);\
    range.collapse(false);\
    selection.removeAllRanges();\
    selection.addRange(range);\
\
    // \uc0\u20248 \u20808 \u20351 \u29992  execCommand \u25554 \u20837 \u25991 \u26412 \u65288 \u19981 \u23569 \u23500 \u25991 \u26412 \u32534 \u36753 \u22120 \u20173 \u25903 \u25345 \u65289 \
    const before = editor.textContent || "";\
    const ok = document.execCommand("insertText", false, text);\
\
    // \uc0\u22238 \u36864 \u65306 \u33509  execCommand \u19981 \u29983 \u25928 \u65292 \u21017 \u30452 \u25509 \u35774 \u32622  textContent\
    if (!ok) \{\
      editor.textContent = before + text;\
    \}\
\
    // \uc0\u35302 \u21457 \u36755 \u20837 \u20107 \u20214 \u65292 \u20419 \u20351 \u21069 \u31471 \u29366 \u24577 \u26356 \u26032 \
    editor.dispatchEvent(new Event("input", \{ bubbles: true \}));\
    editor.dispatchEvent(new Event("change", \{ bubbles: true \}));\
\
    // \uc0\u21487 \u36873 \u65306 \u23558 \u25554 \u20837 \u23436 \u25104 \u21518 \u25226  URL \u20013 \u30340  text \u21442 \u25968 \u31227 \u38500 \u65292 \u36991 \u20813 \u21047 \u26032 \u37325 \u22797 \u25554 \u20837 \
    try \{\
      const url = new URL(window.location.href);\
      url.searchParams.delete("text");\
      // \uc0\u20351 \u29992  history.replaceState \u19981 \u20250 \u23548 \u33268 \u39029 \u38754 \u37325 \u36733 \
      window.history.replaceState(\{\}, document.title, url.toString());\
    \} catch (e) \{\
      // \uc0\u38745 \u40664 \u22833 \u36133 \u21363 \u21487 \
      console.warn("Jike Compose Autofill: clean URL param failed:", e);\
    \}\
  \}\
\
  // \uc0\u20027 \u27969 \u31243 \
  waitForEditor()\
    .then((editor) => \{\
      fillEditor(editor, preset);\
    \})\
    .catch((e) => \{\
      console.warn("Jike Compose Autofill: \uc0\u26410 \u25214 \u21040 \u32534 \u36753 \u22120 \u65306 ", e);\
    \});\
\})();\
}
// ==UserScript==
// @name         Auto Paste Clipboard to Google Translate (Japanese Only)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Continuously check the clipboard and paste Japanese text into the Google Translate input box.
// @match        https://translate.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastClipboardText = '';

    // Function to check if the text contains Japanese characters
    function isJapanese(text) {
        // This regex checks for the presence of Hiragana, Katakana, or Kanji characters.
        const japaneseRegex = /[\u3040-\u30FF\u4E00-\u9FFF]/;
        return japaneseRegex.test(text);
    }

    // Function to paste clipboard content into the textarea
    function pasteClipboard() {
        // Find the text area for input
        const textArea = document.querySelector('textarea.er8xn');
        if (textArea) {
            // Read the clipboard content
            navigator.clipboard.readText().then(clipText => {
                if (clipText && clipText !== lastClipboardText && isJapanese(clipText)) {
                    // Update the text area value and trigger an input event if the text is Japanese
                    textArea.value = clipText;
                    textArea.dispatchEvent(new Event('input', { bubbles: true }));

                    // Save the current clipboard text to avoid duplicate pasting
                    lastClipboardText = clipText;
                }
            });
        }
    }

    // Check clipboard content every second
    setInterval(pasteClipboard, 1000);
})();

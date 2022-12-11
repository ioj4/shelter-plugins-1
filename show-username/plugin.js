 (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // plugins/show-username/index.js
  var show_username_exports = {};
  __export(show_username_exports, {
    onLoad: () => onLoad,
    onUnload: () => onUnload
  });
  var {
    flux: {
      dispatcher,
      stores: { GuildMemberStore, ChannelStore }
    },
    util: {
      getFiber,
      reactFiberWalker
    },
    observeDom
  } = shelter;
  function addUsernames() {
    for (const e of document.querySelectorAll("[id^=message-username-]")) {
      if (e?.dataset?.YSINK_SU)
        continue;
      e.dataset.YSINK_SU = true;
      const msg = reactFiberWalker(getFiber(e), "message", true).pendingProps?.message;
      const authorUsername = msg.author?.username;
      const authorId = msg?.author?.id;
      const guildId = ChannelStore.getChannel(msg?.channel_id)?.guild_id;
      const nick = GuildMemberStore.getNick(guildId, authorId);
      if (!nick || !authorUsername)
        continue;
      e.firstElementChild.textContent += ` (${authorUsername})`;
    }
  }
  var TRIGGERS = ["MESSAGE_CREATE", "CHANNEL_SELECT", "LOAD_MESSAGES_SUCCESS", "UPDATE_CHANNEL_DIMENSIONS"];
  function onDispatch() {
    const unObserve = observeDom("[id^=message-username-]", () => {
      unObserve();
      queueMicrotask(addUsernames);
    });
    setTimeout(unObserve, 500);
  }
  function onLoad() {
    for (const t of TRIGGERS)
      dispatcher.subscribe(t, onDispatch);
  }
  function onUnload() {
    for (const t of TRIGGERS)
      dispatcher.unsubscribe(t, onDispatch);
  }
  return __toCommonJS(show_username_exports);
})();

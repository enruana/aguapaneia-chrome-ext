// locales/en/messages.json
var messages_default = {
  extensionDescription: {
    description: "Extension description",
    message: "Chrome extension boilerplate developed with Vite, React and Typescript"
  },
  extensionName: {
    description: "Extension name",
    message: "Chrome extension boilerplate"
  },
  toggleTheme: {
    message: "Toggle theme"
  },
  loading: {
    message: "Loading..."
  },
  greeting: {
    description: "Greeting message",
    message: "Hello, My name is $NAME$",
    placeholders: {
      name: {
        content: "$1",
        example: "John Doe"
      }
    }
  },
  hello: {
    description: "Placeholder example",
    message: "Hello $1"
  }
};

// locales/ko/messages.json
var messages_default2 = {
  extensionDescription: {
    description: "Extension description",
    message: "React, Typescript, Vite\uB97C \uC0AC\uC6A9\uD55C \uD06C\uB86C \uC775\uC2A4\uD150\uC158 \uBCF4\uC77C\uB7EC\uD50C\uB808\uC774\uD2B8\uC785\uB2C8\uB2E4."
  },
  extensionName: {
    description: "Extension name",
    message: "\uD06C\uB86C \uC775\uC2A4\uD150\uC158 \uBCF4\uC77C\uB7EC\uD50C\uB808\uC774\uD2B8"
  },
  toggleTheme: {
    message: "\uD14C\uB9C8 \uBCC0\uACBD"
  },
  loading: {
    message: "\uB85C\uB529 \uC911..."
  },
  greeting: {
    description: "\uC778\uC0AC \uBA54\uC2DC\uC9C0",
    message: "\uC548\uB155\uD558\uC138\uC694, \uC81C \uC774\uB984\uC740 $NAME$\uC785\uB2C8\uB2E4.",
    placeholders: {
      name: {
        content: "$1",
        example: "\uC11C\uC885\uD559"
      }
    }
  },
  hello: {
    description: "Placeholder \uC608\uC2DC",
    message: "\uC548\uB155 $1"
  }
};

// lib/getMessageFromLocale.ts
function getMessageFromLocale(locale) {
  switch (locale) {
    case "en":
      return messages_default;
    case "ko":
      return messages_default2;
    default:
      throw new Error("Unsupported locale");
  }
}
var defaultLocale = (() => {
  const locales = ["en", "ko"];
  const firstLocale = locales[0];
  const defaultLocale2 = Intl.DateTimeFormat().resolvedOptions().locale.replace("-", "_");
  if (locales.includes(defaultLocale2)) {
    return defaultLocale2;
  }
  const defaultLocaleWithoutRegion = defaultLocale2.split("_")[0];
  if (locales.includes(defaultLocaleWithoutRegion)) {
    return defaultLocaleWithoutRegion;
  }
  return firstLocale;
})();

// lib/i18n.ts
function translate(key, substitutions) {
  const value = getMessageFromLocale(t.devLocale)[key];
  let message = value.message;
  if (value.placeholders) {
    Object.entries(value.placeholders).forEach(([key2, { content }]) => {
      if (!content) {
        return;
      }
      message = message.replace(new RegExp(`\\$${key2}\\$`, "gi"), content);
    });
  }
  if (!substitutions) {
    return message;
  }
  if (Array.isArray(substitutions)) {
    return substitutions.reduce((acc, cur, idx) => acc.replace(`$${idx + 1}`, cur), message);
  }
  return message.replace(/\$(\d+)/, substitutions);
}
function removePlaceholder(message) {
  return message.replace(/\$\d+/g, "");
}
var t = (...args) => {
  return removePlaceholder(translate(...args));
};
t.devLocale = defaultLocale;

// index.ts
var t2 = t;
export {
  t2 as t
};
//# sourceMappingURL=index.js.map

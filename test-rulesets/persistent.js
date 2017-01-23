module.exports = {
  "rid": "io.picolabs.persistent",
  "meta": {
    "shares": [
      "getName",
      "getAppVar",
      "getUser",
      "getUserFirstname"
    ]
  },
  "global": function (ctx) {
    ctx.scope.set("getName", ctx.KRLClosure(ctx, function (ctx) {
      return ctx.modules.get(ctx, "ent", "name");
    }));
    ctx.scope.set("getAppVar", ctx.KRLClosure(ctx, function (ctx) {
      return ctx.modules.get(ctx, "app", "appvar");
    }));
    ctx.scope.set("getUser", ctx.KRLClosure(ctx, function (ctx) {
      return ctx.modules.get(ctx, "ent", "user");
    }));
    ctx.scope.set("getUserFirstname", ctx.KRLClosure(ctx, function (ctx) {
      return ctx.callKRLstdlib("get", ctx.modules.get(ctx, "ent", "user"), ["firstname"]);
    }));
  },
  "rules": {
    "store_my_name": {
      "name": "store_my_name",
      "select": {
        "graph": { "store": { "name": { "expr_0": true } } },
        "eventexprs": {
          "expr_0": function (ctx) {
            var matches = ctx.modules.get(ctx, "event", "attrMatches")(ctx, [[[
                  "name",
                  new RegExp("^(.*)$", "")
                ]]]);
            if (!matches)
              return false;
            ctx.scope.set("my_name", matches[0]);
            return true;
          }
        },
        "state_machine": {
          "start": [[
              "expr_0",
              "end"
            ]]
        }
      },
      "action_block": {
        "actions": [{
            "action": function (ctx) {
              return {
                "type": "directive",
                "name": "store_name",
                "options": { "name": ctx.scope.get("my_name") }
              };
            }
          }]
      },
      "postlude": {
        "fired": undefined,
        "notfired": undefined,
        "always": function (ctx) {
          ctx.modules.set(ctx, "ent", "name", ctx.scope.get("my_name"));
        }
      }
    },
    "store_appvar": {
      "name": "store_appvar",
      "select": {
        "graph": { "store": { "appvar": { "expr_0": true } } },
        "eventexprs": {
          "expr_0": function (ctx) {
            var matches = ctx.modules.get(ctx, "event", "attrMatches")(ctx, [[[
                  "appvar",
                  new RegExp("^(.*)$", "")
                ]]]);
            if (!matches)
              return false;
            ctx.scope.set("my_appvar", matches[0]);
            return true;
          }
        },
        "state_machine": {
          "start": [[
              "expr_0",
              "end"
            ]]
        }
      },
      "action_block": {
        "actions": [{
            "action": function (ctx) {
              return {
                "type": "directive",
                "name": "store_appvar",
                "options": { "appvar": ctx.scope.get("my_appvar") }
              };
            }
          }]
      },
      "postlude": {
        "fired": undefined,
        "notfired": undefined,
        "always": function (ctx) {
          ctx.modules.set(ctx, "app", "appvar", ctx.scope.get("my_appvar"));
        }
      }
    },
    "store_user_firstname": {
      "name": "store_user_firstname",
      "select": {
        "graph": { "store": { "user_firstname": { "expr_0": true } } },
        "eventexprs": {
          "expr_0": function (ctx) {
            var matches = ctx.modules.get(ctx, "event", "attrMatches")(ctx, [[[
                  "firstname",
                  new RegExp("^(.*)$", "")
                ]]]);
            if (!matches)
              return false;
            ctx.scope.set("firstname", matches[0]);
            return true;
          }
        },
        "state_machine": {
          "start": [[
              "expr_0",
              "end"
            ]]
        }
      },
      "action_block": {
        "actions": [{
            "action": function (ctx) {
              return {
                "type": "directive",
                "name": "store_user_firstname",
                "options": { "name": ctx.scope.get("firstname") }
              };
            }
          }]
      },
      "postlude": {
        "fired": undefined,
        "notfired": undefined,
        "always": function (ctx) {
          ctx.modules.set(ctx, "ent", "user", { "lastname": "McCoy" });
          ctx.modules.set(ctx, "ent", "user", ctx.callKRLstdlib("set", ctx.modules.get(ctx, "ent", "user"), ["firstname"], ctx.scope.get("firstname")));
        }
      }
    }
  }
};
{
  "rules": {
    "customers": {
      "$uid": {
        ".read": "auth != null && (auth.uid === $uid || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".write": "auth != null && (auth.uid === $uid || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".validate": "newData.hasChildren(['name', 'phone'])",
        "name": {
          ".validate": "newData.isString() && newData.val().length >= 3 && newData.val().length <= 50"
        },
        "phone": {
          ".validate": "newData.isString() && newData.val().matches(/^[0-9]{10}$/)"
        },
        "address": {
          ".validate": "newData.isString() && newData.val().length <= 200"
        },
        "email": {
          ".validate": "newData.isString()"
        },
        "fcmToken": {
          ".validate": "newData.isString() && newData.val().length <= 500"
        },
        "usedCoupons": {
          ".validate": "newData.hasChildren()",
          "$coupon": {
            ".validate": "newData.isBoolean()"
          }
        },
        "lastOrderId": {
          ".validate": "newData.isString()"
        },
        "uid": {
          ".validate": "newData.val() === $uid"
        },
        "createdAt": {
          ".validate": "newData.val() == data.val() || newData.val() == now"
        },
        "$other": {
          ".validate": "false"
        }
      }
    },
    "orders": {
      "$orderId": {
        ".read": "auth != null && (data.child('uid').val() === auth.uid || root.child('boy_sessions').child(auth.uid).child('boyId').exists() || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".write": "auth != null && (data.child('uid').val() === auth.uid || root.child('boy_sessions').child(auth.uid).child('boyId').exists() || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".validate": "newData.hasChildren(['orderId', 'uid', 'customerName', 'phone', 'address', 'subtotal', 'total', 'status', 'createdAt'])",
        "uid": {
          ".validate": "newData.isString()"
        },
        "customerName": {
          ".validate": "newData.isString() && newData.val().length >= 3"
        },
        "phone": {
          ".validate": "newData.isString() && newData.val().matches(/^[0-9]{10}$/)"
        },
        "address": {
          ".validate": "newData.isString()"
        },
        "subtotal": {
          ".validate": "newData.isNumber()"
        },
        "total": {
          ".validate": "newData.isNumber()"
        },
        "status": {
          ".validate": "newData.isString()"
        },
        "paymentStatus": {
          ".validate": "newData.isString()"
        },
        "createdAt": {
          ".validate": "newData.val() == data.val() || newData.val() == now"
        },
        "assigned_to_e164": {
          ".validate": "newData.isString()"
        },
        "assigned_to": {
          ".validate": "newData.isString()"
        },
        "$other": {
          ".validate": "true"
        }
      }
    },
    "notifications": {
      "$notificationId": {
        ".read": "auth != null && (auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1' || root.child('notifications').child($notificationId).child('boy').val() === auth.uid)",
        ".write": "auth != null && (auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1' || root.child('notifications').child($notificationId).child('boy').val() === auth.uid)",
        ".validate": "newData.hasChildren(['type', 'at'])",
        "type": {
          ".validate": "newData.isString()"
        },
        "boy": {
          ".validate": "newData.isString()"
        },
        "boyPhone": {
          ".validate": "newData.isString()"
        },
        "customer": {
          ".validate": "newData.isString()"
        },
        "status": {
          ".validate": "newData.isString()"
        },
        "orderId": {
          ".validate": "newData.isString()"
        },
        "note": {
          ".validate": "newData.isString()"
        },
        "at": {
          ".validate": "newData.val() == now"
        },
        "read": {
          ".validate": "newData.isBoolean()"
        },
        "$other": {
          ".validate": "false"
        }
      }
    },
    "chat": {
      "$boyId": {
        ".read": "auth != null && (auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1' || root.child('boy_sessions').child(auth.uid).child('boyId').val() === $boyId)",
        ".write": "auth != null && (auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1' || root.child('boy_sessions').child(auth.uid).child('boyId').val() === $boyId)",
        "$messageId": {
          ".validate": "newData.hasChildren(['text', 'from', 'at'])",
          "text": {
            ".validate": "newData.isString() && newData.val().length <= 1000"
          },
          "from": {
            ".validate": "newData.isString() && (newData.val() === 'admin' || newData.val() === 'boy')"
          },
          "at": {
            ".validate": "newData.val() == now"
          },
          "boyName": {
            ".validate": "newData.isString()"
          },
          "boyPhone": {
            ".validate": "newData.isString()"
          },
          "$other": {
            ".validate": "false"
          }
        }
      }
    },
    "delivery_boys": {
      ".read": "auth != null",
      ".write": "auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1'",
      "$boyId": {
        ".validate": "newData.hasChildren(['name', 'phone', 'code'])",
        "name": {
          ".validate": "newData.isString()"
        },
        "phone": {
          ".validate": "newData.isString() && newData.val().matches(/^[0-9]{10}$/)"
        },
        "code": {
          ".validate": "newData.isString()"
        },
        "$other": {
          ".validate": "true"
        }
      }
    },
    "boy_sessions": {
      "$uid": {
        ".read": "auth != null && (auth.uid === $uid || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".write": "auth != null && (auth.uid === $uid || auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1')",
        ".validate": "newData.hasChildren(['phone', 'phoneE164', 'name', 'boyId'])",
        "phone": {
          ".validate": "newData.isString() && newData.val().matches(/^[0-9]{10}$/)"
        },
        "phoneE164": {
          ".validate": "newData.isString()"
        },
        "name": {
          ".validate": "newData.isString()"
        },
        "boyId": {
          ".validate": "newData.isString()"
        },
        "fcmToken": {
          ".validate": "newData.isString() && newData.val().length <= 500"
        },
        "$other": {
          ".validate": "false"
        }
      }
    },
    "services": {
      ".read": "true",
      ".write": "auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1'",
      "$category": {
        ".validate": "newData.hasChildren(['name', 'items'])",
        "name": { ".validate": "newData.isString()" },
        "items": {
          ".validate": "newData.hasChildren()",
          "$item": {
            ".validate": "newData.hasChildren(['name', 'price'])",
            "name": { ".validate": "newData.isString()" },
            "price": { ".validate": "newData.isNumber()" },
            "$other": { ".validate": "true" }
          }
        }
      }
    },
    "settings": {
      ".read": "true",
      ".write": "auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1'",
      "general": {
        ".validate": "newData.hasChildren(['minOrder', 'expressPercent'])",
        "minOrder": { ".validate": "newData.isNumber()" },
        "expressPercent": { ".validate": "newData.isNumber()" },
        "$other": { ".validate": "true" }
      },
      "coupons": {
        "$coupon": {
          ".validate": "newData.hasChildren(['code', 'percent', 'max', 'enabled', 'type'])",
          "code": { ".validate": "newData.isString()" },
          "percent": { ".validate": "newData.isNumber()" },
          "max": { ".validate": "newData.isNumber()" },
          "enabled": { ".validate": "newData.isBoolean()" },
          "type": { ".validate": "newData.isString()" },
          "$other": { ".validate": "true" }
        }
      }
    },
    "site_content": {
      ".read": "true",
      ".write": "auth.uid === 'GUXPDhpQPPTYRSsNqZGUQGksgGw1'",
      "$node": {
        ".validate": "newData.hasChildren()",
        "$key": {
          ".validate": "true"
        }
      }
    }
  }
}
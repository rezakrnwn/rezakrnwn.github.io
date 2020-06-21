let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BK2rAZfqRRXKvFXBMxs2fkbXrPENXm6kOvjfon0cTfX9k8Po7DJrNZdLxKLhpRvpJG1rZaLLjNkKx5RvsqX174o",
   "privateKey": "Iv9EtCeLWcBRd8sGYNHYHY1l3LFZ0YbhSwZuhewshH4"
};
 
 
webPush.setVapidDetails(
   'mailto:kurniawanreza94@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f_cuKWWcKvo:APA91bFxNOxfLDdv5fMf0760otQSgcu3SFHb_nXCSHRgqX2hotr6vNRStN3Rd4gSlCA3CagPU3SSuIqYG60d4vqYTCSsdaHe9HfabSncHR7YIP6s-jW9lrM8qSr4jXu8NNjAkWAeoBvl",
   "keys": {
       "p256dh": "BNkv/5BK6O9F3RjcEqCvTpfItTk5AAVohb+eO2tAnNyLK0ru+j2GFRE7rt0/MxAfEx5jH8GxHZSiJjLcb1tQV/M=",
       "auth": "XsP3mgCEGswAK2wG5ILRhQ=="
   }
};
let payload = 'Notifkasi PWA Football';
 
let options = {
   gcmAPIKey: '996491450917',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

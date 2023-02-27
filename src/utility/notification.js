export default async function sendPushNotification(token, status) {
  console.log(token);
  try {
    let message = "";
    if (status === "Approved") {
      message =
        "Your account has been Approved by Locality. You can now send proposal and contact with the client.";
    } else if (status === "Disapproved") {
      message = "Your account has been Disapproved by Locality.";
    } else {
      message = "We are going through your details. Please stay with Locality.";
    }
    const sendRequest = {
      token: token,
      message: message,
    };

    // https://tradesmanbackend.onrender.com/api/sendNotification

    // http://tradesmanserver-env-1.eba-hzwqbpu9.ap-northeast-1.elasticbeanstalk.com/api/sendNotification

    fetch(
      "http://tradesmanserver-env-1.eba-hzwqbpu9.ap-northeast-1.elasticbeanstalk.com/api/sendNotification",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sendRequest),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.log(error.message);
  }
}

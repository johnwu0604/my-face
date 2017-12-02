/**
 * Created by TiffanyWang on 2017-12-01.
 */
FB.api("/me", function (response) {
        id = response.id
        res.send(id)
    }
);
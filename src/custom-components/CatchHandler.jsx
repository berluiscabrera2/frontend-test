import Swal from 'sweetalert2'

export default function CatchHandler(error) {
    let messages = null;
    let html = null;
    let errorTitle = "error"

    if (!error.response) {
        messages = error.message
    }

    if (error.response && error.response?.status === 404 && !error.response.data.error) {
        messages = "your request cannot be processed"
    }

    if (error.response && error.response?.status === 401) {
        let errors = error.response.data.errors || error.response.data.error
        if (errors === "Invalid token - user does not exist") {
            localStorage.removeItem("token");
            return window.location.reload()
        }
        messages = 'you are not authorized to make this request'
    }

    if (error.response && error.response?.status === 429) {
        messages = 'you have made too many requests, please try again later'
    }

    if (error.response && error.response?.status === 400 || error.response?.status === 404 || error.response?.status === 500) {
        let errors = error.response.data.errors || error.response.data.error

        if (errors === "Invalid Token") {
            localStorage.removeItem("token");
            return window.location.reload()
        }

        let text;
        let title = getI18n().t("your request could not be processed", {ns: 'alert'})
        if (typeof errors === "object") {
            let body = errors.map(error => '<li style="text-align: left">' + error.msg, {ns: 'alert'} + '</li>').join("")
            text = `<div><h3> ${title} </h3> <br> ${body} </div>`
        } else {
            let body = `<li style="text-align: left">${errors, {ns: 'alert'}}</li>`
            text = `<div><h3> ${title} </h3> <br> ${body} </div>`
        }
        html = text;
    }

    messages = 'we are having problems at the moment. Please try again later'

    return new Promise((resolve, reject) => {
        Swal.fire({
            title: errorTitle,
            icon: 'error',
            text: messages,
            html: html,
            confirmButtonText: "ok",
            confirmButtonColor: '#273F70'
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true)
            }
        }).catch(e => {
            reject(e);
        })
    });

}

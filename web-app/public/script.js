var auth2;

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/documents.readonly"})
        .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); });
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyD7qk5VrQFjogROphN_Lr1oQMpOYAQLov4");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/docs/v1/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute(id) {
    return gapi.client.docs.documents.get({
        "documentId": id,
        "suggestionsViewMode": "PREVIEW_WITHOUT_SUGGESTIONS",
        "prettyPrint": true
    })
        .then(function(response) {
                console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
    }
    gapi.load("client:auth2", function() {
    auth2 = gapi.auth2.init({client_id: "570616045500-um4d2qq5ii78dqof943ohrndpv356gr7.apps.googleusercontent.com"});
});

function check_rkt() {
    var documentURL = document.getElementById('docsURL').value;
    var documentID = documentURL.split('/')[documentURL.split('/').length-2];

    console.log('doc id = ', documentID);
    get_from_docs(documentID);
}

function get_from_docs(id) {
    if(auth2.isSignedIn.get()) {
        execute(id);
    }
    else {
        authenticate();
    }
}

function send_to_server(content) {
}


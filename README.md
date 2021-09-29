# Looneylosers_webapp1
This repo contains all the code for both front end as well as front for our webbapp1 track in Devlok. We are currently developing backend in Django and front end in react.


## Documentation
Here is the documentation of APi
### Admin Panel ###
**Path:** `admin/`
Admin can access all the models and can necessary changes,moderation etc.

### Registration
**Path:** `api/v1/rest-auth/registration/`
 Post Request:
 ```json
{
    "username" : "valid_username",
    "email": "valid@email.com",
    "password1" : "password",
    "password2" : "password confirmation"
}
 ```
 A successfull Post request yields login token of registred user in the form
 ```json
{
    "key" : "--token--"
}
 ```

### Login
**Path:** `api/v1/rest-auth/login/`
Post Request(email is optional here):
```Json
{
    "username" : "",
    "email" : "",
    "password" : ""
}
```
A successfull Post request yields login token in the form
```json
{
    "key" : "--token--"
}
```
### Logout
**Path:**`api/v1/rest-auth/logout/`
Post Request takes token key and deletes it from backend
```json
{
    "key" : ""
}
```
### Password reset
**Path:**`api/v1/rest-auth/password/change/`
Post Request:
```json

```
### Others


| Sr No | Path                      | Usage                                                                                                                                  | Method Allowed |
|-------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------|----------------|
| 1     | `api/v1/notes/`           | Displays/Adds/Filters/Search notes                                                                                                     | Get,Post       |
| 2     | `api/v1/note/<note_id>/`  | Authorized users(user if its private  or anyone if it is public) can see a particular notes and its comments and user can change note  | Get, Put       |
| 3     | `api/v1/comment/note_id/` | Authorized user can add comment on note                                                                                                | Post           |
| 4     | `api/v1/user/`            | User detail is available and user is also able to change his name and email (further customization is in the roadmap)                  | Get,Post       |
<!-- | 5     | `api/v1/auth/google`      | Google authentication, hard to implement it in front-end right now                                                                     |                | -->



### Profile

## Deployment
View deployment (here)[https://augurcognito.github.io/landing-page-webtrack1/]
 [FrontEnd Deployed here](https://nervous-mahavira-2b149f.netlify.app/login/)
 <br>
 [Backend Deployed here](https://track1api.herokuapp.com/)

 ---
 For additonal queries contact me at singhaniket@tutanota.com.
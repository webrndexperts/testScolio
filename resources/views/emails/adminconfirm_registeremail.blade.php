<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>{{__('messages.admin.welcome')}}</h1>
    <p>{{__('messages.admin.userCreated',['userName'=>$details['name']])}}</p>
    <p>{{__('messages.admin.thank you')}}</p>
</body>
</html>
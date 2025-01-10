<!DOCTYPE html>
<html>
<head>
    <title>ContactUs form</title>
</head>
<body>

    <div id="" dir="ltr"
   style="background-color:#f9f9f9;margin:0;padding:70px 0;width:100%;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
   <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
   <tbody>
      <tr>
         <td align="center" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="600" id="container"
               style="background-color:#fff;border:1px solid #e0e0e0;border-radius:3px">
   <tbody>
      <tr>
         <td align="center" valign="top">
            <table width="100%" id=""
               style="background-color:#f5ad1d;color:#202020;border-bottom:0;font-weight:bold;line-height:100%;border-radius:3px 3px 0 0">
               <tbody>
                  <tr>
                     <td id="" style="padding:36px 48px;display:block">
                        <h1
                           style="font-size:30px;font-weight:600;line-height:150%;margin:0;text-align:center;color:#fff">
                           {{__('messages.myEmail.thank you')}}
                        </h1>
                     </td>
                  </tr>
               </tbody>
            </table>
         </td>
      </tr>
      <tr>
         <td align="center" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="600" id="">
   <tbody>
      <tr>
         <td valign="top" id="" style="background-color:#fff">
            <table border="0" cellpadding="20" cellspacing="0" width="100%">
   <tbody>
      <tr>
         <td valign="top" style="padding:48px 48px 32px">
            <div id=""
               style="color:#636363;font-size:14px;line-height:150%">
               <div style="margin-bottom:40px">
                  <table cellspacing="0" cellpadding="6"
                     border="1"
                     style="color:#636363;border:1px solid #e5e5e5;width:100%; width:100%;font-size: 14px">
                     <tfoot
                        style="color:#636363;text-align: left !important;font-size: 14px">
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px;width: 40%;">
                              {{__('messages.myEmail.contact')}}:
                           </th>
                           <td
                              style="color:#636363;border:1px solid #e5e5e5;padding:12px;">
                              <span>{{ $details['contact_enquiry'] }}</span>
                           </td>
                        </tr>
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Name')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px">
                              <span>{{ $details['name'] }}</span>
                           </td>
                        </tr>
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Email')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{ $details['email_address'] }}
                           </td>
                        </tr>
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Contact Number')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px;">
                              <span>{{ $details['phone_number'] }}</span>
                           </td>
                        </tr>
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Country')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{ $details['country'] }}
                           </td>
                        </tr>
                        <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Your Message')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px">
                              <span>{{ $details['message'] }}</span>
                           </td>
                        </tr>
                        @if($details['photo'])
                         <tr>
                           <th scope="row" colspan="2"
                              style="border:1px solid #e5e5e5;padding:12px">
                              {{__('messages.myEmail.Image')}}:
                           </th>
                           <td
                              style="border:1px solid #e5e5e5;padding:12px">

                              @foreach(json_decode($details['photo']) as $imageUrl)
                              <img src="{{ $imageUrl }}" alt="{{ basename($imageUrl) }}" style="max-width: 110px;">
                                 @endforeach

                           </td>
                        </tr>
                         @endif
                     </tfoot>
                  </table>
               </div>
            </div>
</div>
</body>
</html>
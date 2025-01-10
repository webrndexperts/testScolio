<html>
<body>
<div id="" dir="ltr" style="background-color:#f9f9f9;margin:0;padding:70px 0;width:100%;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
            <tbody><tr>
                <td align="center" valign="top">
                    <div id="">
                        <p style="margin-top:0"><img src="https://sladmin.scoliolife.com/uploads/2022/06/ScolioLife-Email-Header-Jun-2022.png" alt="ScolioLife™">
                           </p>						</div>
                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="container" style="background-color:#fff;border:1px solid #e0e0e0;border-radius:3px">
                        <tbody><tr>
                            <td align="center" valign="top">
             <table width="100%" id="" style="background-color:#f5ad1d;color:#202020;border-bottom:0;font-weight:bold;line-height:100%;border-radius:3px 3px 0 0">
                                    <tbody><tr>
                                        <td id="" style="padding:36px 48px;display:block">
                                            <h1 style="font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;color:#202020">{{__('messages.template.banner')}}</h1>
                                        </td>
                                    </tr>
                                </tbody></table>
                                
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="600" id="">
                                    <tbody><tr>
                                        <td valign="top" id="" style="background-color:#fff">
                                            
                                            <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                <tbody><tr>
                                                    <td valign="top" style="padding:48px 48px 32px">
                                                        <div id="" style="color:#636363;font-size:14px;line-height:150%">

<p style="margin:0 0 15px">{{ __('messages.template.hi',['name'=> $details['firstName']." ".$details['lastName']]) }},</p>
<p style="margin:0 0 15px"> {{ __('messages.template.let',['orderNo'=>$details['order_number']]) }}</p>


<h2 style="color:#f5ad1d;display:block;font-size:18px;font-weight:bold;line-height:130%;margin:0 0 18px;text-align:left">
    {{__('messages.template.order',['orderNo'=>$details['order_number'],'orderDate'=>$details['created_order_date']]) }} </h2>

<div style="margin-bottom:40px">
<table cellspacing="0" cellpadding="6" border="1" style="color:#636363;border:1px solid #e5e5e5;width:100%; width:100%;font-size: 14px">
    <thead>
        <tr>
            <th scope="col" style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align: left">{{__('messages.table.Product')}}</th>
            <th scope="col" style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align: left">{{__('messages.table.Quantity')}}</th>
            <th scope="col" style="color:#636363;border:1px solid #e5e5e5;padding:12px;text-align: left">{{__('messages.table.Price')}}</th>
        </tr>
    </thead>
    <tbody>
	
	@foreach ($details['ordermailProducts'] as $orderItemInfo)
					

            <tr>
    <td style="color:#636363;border:1px solid #e5e5e5;padding:12px;word-wrap:break-word">
		{{ $orderItemInfo->product->title }}
    <!--img src="https://ci3.googleusercontent.com/meips/ADKq_NaWoXPRGp_muQHIlnf5SKQ0wgeuGmjGiX3CR7naQBhq2DwVXoQOA-sL4CsQikasWFqQcIhn0vuPCH9DXXNDzCd5MMaZ4c01pwmmECTd=s0-d-e1-ft#https://s.w.org/images/core/emoji/14.0.0/72x72/2122.png" alt="™" style="height:1em;max-height:1em"-->	
	</td>
    <td style="color:#636363;border:1px solid #e5e5e5;padding:12px">  {{ $orderItemInfo->quantity }}		</td>
    <td style="color:#636363;border:1px solid #e5e5e5;padding:12px">
        <span><span>$</span>{{number_format($orderItemInfo->product->price,2)}} SGD</span>		</td>
</tr>
@endforeach 	
	

    </tbody>
    <tfoot style="color:#636363;text-align: left !important;font-size: 14px">
                <tr>
				<th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px;border-top-width:4px">{{__('messages.table.Subtotal')}}:</th>
				 <td style="color:#636363;border:1px solid #e5e5e5;padding:12px;border-top-width:4px"><span><span>$</span>{{number_format($details['total_amount'],2)}} SGD</span></td>
			   </tr>
				
				@if(isset($details['coupon_discount']) && $details['coupon_discount'] > 0)
					<tr>
						<th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.Discount')}}:</th>
						<td style="border:1px solid #e5e5e5;padding:12px"><span><span>$</span>{{ number_format($details['coupon_discount'], 2) }} SGD</span></td>
					</tr>
				@endif

				@if(isset($details['shipping_method_name']) && !empty($details['shipping_method_name']))
					<tr>
						<th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.Shipping Name')}}:</th>
						<td style="border:1px solid #e5e5e5;padding:12px">{{ $details['shipping_method_name'] }} </td>
					</tr>
				@endif
				@if(isset($details['payment_method']) && !empty($details['payment_method']))
					<tr>
						<th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.PayemntMethod')}}:</th>
						<td style="border:1px solid #e5e5e5;padding:12px">{{ $details['payment_method'] }} </td>
					</tr>
				@endif
				
				@if(isset($details['shipping_price']) && !empty($details['shipping_price']))
			    <tr>
                    <th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.Shipping Price')}}:</th>
                    <td style="border:1px solid #e5e5e5;padding:12px">${{number_format($details['shipping_price'],2)}} SGD </td>
                </tr>
				@endif
				@if(isset($details['gst_tax']) && !empty($details['gst_tax']))
                <tr>
                    <th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.Tax')}}:</th>
                    <td style="border:1px solid #e5e5e5;padding:12px;"><span><span>$</span>{{number_format($details['gst_tax'],2)}} SGD</span></td>
                </tr>
				@endif
				@if(isset($details['total_price']) && !empty($details['total_price']))
                 <tr>
                    <th scope="row" colspan="2" style="border:1px solid #e5e5e5;padding:12px">{{__('messages.table.Total')}}:</th>
                    <td style="border:1px solid #e5e5e5;padding:12px"><span><span>$</span>{{number_format($details['total_price'],2)}} SGD</span></td>
                </tr>
				@endif
         </tfoot>
</table>
</div>

<table id="" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin-bottom:40px;padding:0" width="100%">
<tbody><tr>
    <td  width="50%" style="border:0;padding:0" align="left">
        <h2 style="color:#f5ad1d;font-size:18px;line-height:130%;margin:0 0 18px">{{__('messages.table.Billing address')}}</h2>

        <address style="padding:12px;color:#636363;border:1px solid #e5e5e5">
           {{ $details['firstName'] }} {{ $details['lastName'] }}<br>{{ $details['city'] }}<br>{{ $details['street'] }}<br>{{ $details['postcode'] }}<br>{{ $details['country'] }}
            	<br><a href="tel:65628942" style="color:#202020;font-weight:normal;text-decoration:underline" >{{ $details['phone'] }}</a>
            						<br><a href="mailto:{{ $details['email'] }}">{{ $details['email'] }}</a>					
                                		</address>
    </td>
        </tr>
</tbody></table>
<p style="margin:0 0 16px">{{__('messages.thanks')}} <a href="http://scoliolife.com">scoliolife.com</a>!</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                                
                            </td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table><div class="yj6qo"></div><div class="adL">
    </div></div><div class="adL">
</div></div>
	

</body>
</html>









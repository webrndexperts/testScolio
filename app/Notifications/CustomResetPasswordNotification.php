<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends Notification
{
    public $token;
    public $url;
    protected $subject;
    protected $line1;
    protected $line2;
    protected $button;

    public function __construct($token, $url)
    {
        $this->token = $token;
        $this->url = $url;

        $this->generateLanguageValues();
    }

    protected function generateLanguageValues() {
        $_subject = 'Reset Password Notification';
        $_line1 = 'You are receiving this email because we received a password reset request for your account.';
        $_line2 = 'If you did not request a password reset, no further action is required.';
        $_button = 'Reset Password';

        // switch ($_GET['lang']) {
        //     case 'zh_HK':
        //         $_subject = '重置密碼通知。';
        //         break;
            
        //     default:
        //         break;
        // }

        $this->subject = $_subject;
        $this->line1 = $_line1;
        $this->line2 = $_line2;
        $this->button = $_button;

        return true;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject($this->subject)
            ->line($this->line1)
            ->action($this->button, $this->url)
            ->line($this->line2);
    }
}
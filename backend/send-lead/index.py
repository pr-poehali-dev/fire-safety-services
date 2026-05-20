import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ПожДозор на почту skpb01@mail.ru"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    object_type = body.get("object_type", "").strip()
    comment = body.get("comment", "").strip()
    source = body.get("source", "Форма на сайте")

    if not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Укажите номер телефона"}, ensure_ascii=False),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "skpb01@mail.ru"
    to_email = "skpb01@mail.ru"

    subject = f"Новая заявка с сайта — {name or 'Без имени'}"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a5fb4; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">🔔 Новая заявка с сайта ПожДозор</h2>
        </div>
        <div style="background: #f4f7fc; padding: 24px; border-radius: 0 0 10px 10px; border: 1px solid #e0e7f0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #555; width: 160px;">Источник:</td>
                    <td style="padding: 10px 0; color: #1a2533;">{source}</td>
                </tr>
                <tr style="border-top: 1px solid #dce5f0;">
                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Имя:</td>
                    <td style="padding: 10px 0; color: #1a2533;">{name or '—'}</td>
                </tr>
                <tr style="border-top: 1px solid #dce5f0;">
                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Телефон:</td>
                    <td style="padding: 10px 0; color: #1a5fb4; font-size: 18px; font-weight: bold;">{phone}</td>
                </tr>
                <tr style="border-top: 1px solid #dce5f0;">
                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Тип объекта:</td>
                    <td style="padding: 10px 0; color: #1a2533;">{object_type or '—'}</td>
                </tr>
                <tr style="border-top: 1px solid #dce5f0;">
                    <td style="padding: 10px 0; font-weight: bold; color: #555;">Комментарий:</td>
                    <td style="padding: 10px 0; color: #1a2533;">{comment or '—'}</td>
                </tr>
            </table>
        </div>
        <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 16px;">
            Заявка отправлена автоматически с сайта ПожДозор
        </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}),
    }
interface ReceiptEmailProps {
  playerName:  string
  playerEmail: string
  gameTitle:   string
  gameGenre:   string
  gameYear:    number
  accentColor: string
  price:       number        // USD cents
  purchaseId:  string
  gameUrl:     string
}

/**
 * Generates a plain HTML string for the receipt email.
 * Uses table-based layout for maximum email client compatibility.
 */
export function purchaseReceiptHtml(props: ReceiptEmailProps): string {
  const {
    playerName, gameTitle, gameGenre, gameYear,
    accentColor, price, purchaseId, gameUrl,
  } = props

  const formattedPrice  = `$${(price / 100).toFixed(2)} USD`
  const formattedDate   = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const shortId         = purchaseId.slice(-8).toUpperCase()

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Purchase Confirmed — ${gameTitle}</title>
</head>
<body style="margin:0;padding:0;background:#04040a;font-family:'Helvetica Neue',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#04040a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo header -->
          <tr>
            <td style="padding:0 0 32px;text-align:center;">
              <span style="font-size:22px;font-weight:900;letter-spacing:6px;text-transform:uppercase;color:#00f5ff;">
                GAMING<span style="color:#ff4500;">VERSE</span>
              </span>
              <p style="margin:8px 0 0;font-size:10px;color:#6a6a88;letter-spacing:4px;text-transform:uppercase;">STUDIOS</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#0a0a14;border:1px solid rgba(0,245,255,0.12);padding:0;overflow:hidden;">

              <!-- Accent top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height:3px;background:linear-gradient(90deg,${accentColor},transparent);"></td></tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 40px 32px;">
                <tr>
                  <td>
                    <!-- Status -->
                    <p style="margin:0 0 8px;font-size:10px;color:#00f5ff;letter-spacing:5px;text-transform:uppercase;">
                      Purchase Confirmed
                    </p>
                    <h1 style="margin:0 0 24px;font-size:28px;font-weight:900;color:#e8e8f0;letter-spacing:-0.5px;text-transform:uppercase;line-height:1.1;">
                      Welcome to<br/><span style="color:${accentColor};">${gameTitle}</span>
                    </h1>
                    <p style="margin:0 0 32px;font-size:16px;color:#6a6a88;line-height:1.7;">
                      Hey ${playerName}, your purchase is confirmed and ready to play.
                      Thank you for joining the universe.
                    </p>

                    <!-- Game details table -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.06);margin-bottom:32px;">
                      ${[
                        ['Game',     gameTitle],
                        ['Genre',    gameGenre],
                        ['Year',     String(gameYear)],
                        ['Amount',   formattedPrice],
                        ['Date',     formattedDate],
                        ['Order ID', `#${shortId}`],
                      ].map(([label, value], i) => `
                      <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                        <td style="padding:12px 16px;font-size:11px;color:#6a6a88;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;width:40%;">${label}</td>
                        <td style="padding:12px 16px;font-size:14px;color:#e8e8f0;text-align:right;">${value}</td>
                      </tr>`).join('')}
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="${gameUrl}" style="
                            display:inline-block;
                            background:${accentColor};
                            color:#04040a;
                            font-size:12px;
                            font-weight:700;
                            letter-spacing:4px;
                            text-transform:uppercase;
                            text-decoration:none;
                            padding:14px 36px;
                          ">
                            View Your Game →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;color:#6a6a88;letter-spacing:2px;">
                Questions? Reply to this email or visit
                <a href="https://gamingversestudios.com" style="color:#00f5ff;text-decoration:none;">gamingversestudios.com</a>
              </p>
              <p style="margin:0;font-size:10px;color:#3a3a4a;letter-spacing:2px;">
                © ${new Date().getFullYear()} GamingVerse Studios · All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}

/** Plain-text fallback */
export function purchaseReceiptText(props: ReceiptEmailProps): string {
  const { playerName, gameTitle, price, purchaseId, gameUrl } = props
  return [
    `GamingVerse Studios — Purchase Confirmed`,
    ``,
    `Hey ${playerName},`,
    ``,
    `Your purchase of ${gameTitle} is confirmed.`,
    `Amount: $${(price / 100).toFixed(2)} USD`,
    `Order: #${purchaseId.slice(-8).toUpperCase()}`,
    ``,
    `View your game: ${gameUrl}`,
    ``,
    `© ${new Date().getFullYear()} GamingVerse Studios`,
  ].join('\n')
}

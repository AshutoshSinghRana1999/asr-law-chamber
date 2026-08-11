import { ImageResponse } from "next/og";

export const alt =
  "ASR LAW — Advocates & Legal Consultants in New Delhi";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "#F7F6F3",
          color: "#111111",
          padding: "72px 84px",
        }}
      >
        {/* Subtle architectural background */}
        <div
          style={{
            position: "absolute",
            top: "-130px",
            right: "-90px",
            width: "560px",
            height: "560px",
            border: "1px solid rgba(176, 141, 87, 0.20)",
            transform: "rotate(18deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "160px",
            width: "360px",
            height: "700px",
            borderLeft:
              "1px solid rgba(17, 17, 17, 0.08)",
            transform: "rotate(18deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-260px",
            right: "-90px",
            width: "620px",
            height: "620px",
            border: "1px solid rgba(17, 17, 17, 0.06)",
            transform: "rotate(18deg)",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "2px",
                background: "#B08D57",
              }}
            />

            <span
              style={{
                fontSize: "19px",
                fontWeight: 600,
                letterSpacing: "0.18em",
              }}
            >
              ASR LAW
            </span>
          </div>

          <span
            style={{
              marginTop: "11px",
              marginLeft: "62px",
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: "#5C6570",
            }}
          >
            ADVOCATES & LEGAL CONSULTANTS
          </span>
        </div>

        {/* Main statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "760px",
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: "72px",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 400,
            }}
          >
            Strategic Legal
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "serif",
              fontSize: "72px",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 400,
            }}
          >
            Solutions
            <span
              style={{
                color: "#B08D57",
              }}
            >
              .
            </span>
          </div>

          <div
            style={{
              marginTop: "28px",
              width: "620px",
              fontSize: "20px",
              lineHeight: 1.5,
              color: "#5C6570",
            }}
          >
            Commercially focused legal advice and
            representation for businesses, financial
            institutions and individuals.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            paddingTop: "24px",
            borderTop:
              "1px solid rgba(17, 17, 17, 0.14)",
            fontSize: "13px",
            letterSpacing: "0.12em",
            color: "#5C6570",
          }}
        >
          <span>NEW DELHI · INDIA</span>

          <span>
            BANKING · DISPUTES · ARBITRATION ·
            INSOLVENCY · IP
          </span>

          <span>ASRLAW.IN</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
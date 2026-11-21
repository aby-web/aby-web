// The two guides are set in DM Sans and Cormorant Garamond. Only they use
// those fonts, so only they load them (React hoists this into <head>).
export default function GuideFonts() {
  return (
    <link
      rel="stylesheet"
      precedence="default"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
    />
  );
}

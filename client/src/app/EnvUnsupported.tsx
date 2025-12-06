export function EnvUnsupported() {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      }}
    >
      <img
        alt='Telegram sticker'
        src='https://xelene.me/telegram.gif'
        style={{ display: 'block', width: '144px', height: '144px' }}
      />
      <h1>Упс :(</h1>
      <p style={{ textAlign: 'center', padding: '10px' }}>
        Похоже, вы пытаетесь открыть приложение в браузере или у вас старая версия Telegram
      </p>
    </div>
  );
}

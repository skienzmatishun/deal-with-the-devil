import React, { useEffect } from 'react';

const RumbleVideo = () => {
  useEffect(() => {
    // Rumble script
    !function (r, u, m, b, l, e) {
      r._Rumble = b;
      r[b] ||
        (r[b] = function () {
          (r[b]._ = r[b]._ || []).push(arguments);
          if (r[b]._.length == 1) {
            l = u.createElement(m);
            e = u.getElementsByTagName(m)[0];
            l.async = 1;
            l.src =
              'https://rumble.com/embedJS/u4' +
              (arguments[1].video ? '.' + arguments[1].video : '') +
              '/?url=' +
              encodeURIComponent(location.href) +
              '&args=' +
              encodeURIComponent(JSON.stringify([].slice.apply(arguments)));
            e.parentNode.insertBefore(l, e);
          }
        });
    }(window, document, 'script', 'Rumble');

    // Rumble play
    window.Rumble('play', { video: 'v3kukqp', div: 'rumble_v3kukqp' });
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return (
    <div>
      {/* Rumble div */}
      <div id="rumble_v3kukqp"></div>
    </div>
  );
};

export default RumbleVideo;

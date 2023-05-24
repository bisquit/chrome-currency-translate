// import appcss from './App.css?inline';
import appcss from '@unocss/reset/tailwind.css?inline';

export default function Popup() {
  return (
    <>
      <style>{appcss}</style>
      <style>{`@unocss-placeholder`}</style>
      <div>
        <h1>Popup Title</h1>
        <select>
          <option disabled selected>
            Translate to
          </option>
          <option>JPY</option>
          <option>USD</option>
        </select>
      </div>
    </>
  );
}

import { NavLink } from 'react-router-dom';
import './style.less';

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="page-navigator">
        <div className="nav-item" style={{ backgroundColor: '#F2BAC9' }}>
          <NavLink to="/todo?method=webrtc">webrtc TODO</NavLink>
        </div>
        <div className="nav-item" style={{ backgroundColor: '#A9CDEF' }}>
          <NavLink to="/todo?method=websocket">websocket TODO</NavLink>
        </div>
      </div>
    </div>
  );
}
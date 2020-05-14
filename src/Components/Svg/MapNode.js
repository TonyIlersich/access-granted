import React from 'react';
import Colors from '../../Styles/Colors';
import CellPhoneIcon from '../../Assets/Images/CellPhoneIcon';
import { NodeTypes, NodeStates } from '../../Models/Map';
import RouterIcon from '../../Assets/Images/RouterIcon';
import DatabaseIcon from '../../Assets/Images/DatabaseIcon';
import InternetIcon from '../../Assets/Images/InternetIcon';
import CoffeeShopIcon from '../../Assets/Images/CoffeeShopIcon';
import EmailIcon from '../../Assets/Images/EmailIcon';
import FirewallIcon from '../../Assets/Images/FirewallIcon';
import IdentityIcon from '../../Assets/Images/IdentityIcon';
import MalwareScannerIcon from '../../Assets/Images/MalwareScannerIcon';
import OfficeIcon from '../../Assets/Images/OfficeIcon';
import ServerIcon from '../../Assets/Images/ServerIcon';
import UptimeMonitorIcon from '../../Assets/Images/UptimeMonitorIcon';
import LaptopIcon from '../../Assets/Images/LaptopIcon';

export default ({ node, scale, radius, onClick, isSelected }) => {
  let Icon = null;
  switch (node.type) {
    case NodeTypes.CellPhone:
      Icon = CellPhoneIcon;
      break;
    case NodeTypes.CoffeeShop:
      Icon = CoffeeShopIcon;
      break;
    case NodeTypes.Database:
      Icon = DatabaseIcon;
      break;
    case NodeTypes.EmailService:
      Icon = EmailIcon;
      break;
    case NodeTypes.Firewall:
      Icon = FirewallIcon;
      break;
    case NodeTypes.Identity:
      Icon = IdentityIcon;
      break;
    case NodeTypes.Internet:
      Icon = InternetIcon;
      break;
    case NodeTypes.Laptop:
      Icon = LaptopIcon;
      break;
    case NodeTypes.MalwareScanner:
      Icon = MalwareScannerIcon;
      break;
    case NodeTypes.Office:
      Icon = OfficeIcon;
      break;
    case NodeTypes.Router:
      Icon = RouterIcon;
      break;
    case NodeTypes.Server:
      Icon = ServerIcon;
      break;
    case NodeTypes.UptimeMonitor:
      Icon = UptimeMonitorIcon;
      break;
    default:
      throw new Error(`Unexpected node type: '${node.type}'`);
  }
  let color = null, fill = null;
  switch (node.state) {
    case NodeStates.Infected:
      color = Colors.InfectedNode;
      fill = Colors.HalfRed;
      break;
    case NodeStates.Neutral:
      color = Colors.NeutralNode;
      fill = Colors.HalfWhite;
      break;
    case NodeStates.Offline:
      color = Colors.OfflineNode;
      fill = Colors.LightGray
      break;
    case NodeStates.Online:
      color = Colors.OnlineNode;
      fill = Colors.HalfCyan;
      break;
    default:
      throw new Error(`Unexpected node state: '${node.state}'`);
  }
  return <Icon
    color={color}
    fill={isSelected && fill}
    x={(node.x - radius) * scale}
    y={(node.y - radius) * scale}
    width={radius * scale * 2}
    height={radius * scale * 2}
    onClick={onClick} />
};
import styled from "styled-components";
import Margins from "../../Styles/Margins";
import DefaultRow from "../Containers/DefaultRow";

export default styled(DefaultRow)`
    height: 0;
    & ~ & {
        margin-top: ${Margins.KeyMargin};
    }
`;
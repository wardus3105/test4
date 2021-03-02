import React from 'react';
import InfiniteScrollFieldScreen from '../../../../../../libraries/Features/infinity-scroll-field/infinity-scroll-field.screen';
import InfiniteScrollCompanyMemberListAdapter from './infinite-scroll-company-member-list.adapter';
import { IInfiniteScrollCompanyMemberList } from './infinite-scroll-company-member-list.props';

function InfiniteScrollCompanyMemberListScreen(props: IInfiniteScrollCompanyMemberList) {

    const { iconpanel , showCompanyMemberList , className  } = props;

    const {
        companyMemberList,
        totalPages,
        page, setPage ,
        isUpdating
    } = InfiniteScrollCompanyMemberListAdapter(props)

    const length = companyMemberList.length;

    return (
        <InfiniteScrollFieldScreen
            child={ showCompanyMemberList(companyMemberList) }
            iconpanel={ iconpanel }
            length={ length }
            totalPages={ totalPages }
            className={ className }
            isUpdating={ isUpdating }
            page={ page }
            setPage={ setPage }
        ></InfiniteScrollFieldScreen>
    );

}
// "descriptionchatlist-bottom"
export default InfiniteScrollCompanyMemberListScreen;



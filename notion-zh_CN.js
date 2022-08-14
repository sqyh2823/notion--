// ==UserScript==
// @name         Notion-zh_CN notion的汉化脚本
// @namespace    http://tampermonkey.net/
// @version      2.4.6
// @description  notion的100%汉化脚本，基于官方中文+机器翻译韩文，支持app版本以及网页油猴，地址：https://github.com/reamd7/notion-zh_CN
// @author       reamd7
// @match        *://www.notion.so/*
// @grant        none
// @run-at       document-start
// @copyright    2021, reamd7
// @license      MIT
// ==/UserScript==
(function () {
  "use strict";
  var lang = "zh-CN";
  var isSafari =
    navigator.userAgent.includes("Safari/") &&
    !navigator.userAgent.includes("Chrome/");
  var isElectron = "undefined" != typeof global || window.__isElectron;

  const scriptList = document.querySelectorAll("script[defer]");
  const scriptSrcList = Array.from(scriptList).map((v) => v.src);
  if (isSafari) {
    scriptList.forEach((v) => v.remove());
    document.getElementById("notion-app").remove();
  }

  const script = document.createElement("script");
  script.id = "messages";
  script.type = "application/json";
  script.setAttribute("data-locale", lang);
  script.text = JSON.stringify({
    "AuditLogCSV.exportConfirmationDialog.label": "导出",
    "AuditLogSettings.copyAuditLogEvent": "拷贝行",
    "CollectionSettingsSyncedContentShare.continueButton": "继续",
    "CollectionSettingsSyncedContentShare.header": "分享同步的内容给",
    "CollectionSettingsSyncedContentShare.option.restrict.caption":
      "你需要使用分享菜单与他人分享",
    "CollectionSettingsSyncedContentShare.option.restrict.title": "只有你",
    "CollectionSettingsSyncedContentShare.option.share.caption.accessToIntegration":
      "将获得从 {integrationName} 同步内容的访问权限",
    "CollectionSettingsSyncedContentShare.option.share.caption.sharedWithPublic":
      "和通过链接分享的内容",
    "CollectionSettingsSyncedContentShare.option.share.caption.usersWithGuests":
      "{numberOfUsers} 个人（包括你 {numberOfGuests, plural, one {和 {numberOfGuests} 位访客} other {和 {numberOfGuests} 位访客}}）",
    "CollectionSettingsSyncedContentShare.option.share.caption.usersWithoutGuests":
      "{numberOfUsers} 个人（包括你）",
    "CollectionSettingsSyncedContentShare.option.share.title":
      "此页面上的任何人",
    "CollectionSettingsViewMain.editSettings": "编辑 {databaseName} 设置",
    "CollectionViewActionMenu.editSettings": "编辑 {databaseName} 设置",
    "ContextualInvite.permissions_invites.button.cancel": "取消",
    "ContextualInvite.permissions_invites.guest.tooltip":
      "将邀请 {email} 作为访客",
    "ContextualInvite.permissions_invites.messageLengthWarning":
      "{characters}/{maxCharacters} 个字符",
    "ContextualInvite.permissions_invites.removeLinkWarning":
      "消息中的链接将被删除",
    "ContextualInvite.send_guest_invite.button": "发送邀请",
    "ContextualInvite.send_guest_invite.subtitle":
      "{firstEmail}，其他 {numOfEmails} 个",
    "ContextualInvite.send_guest_invite.title": "邀请到页面或工作区？",
    "ContextualInvite.share_this_page.subtitle": "邀请作为页面访客",
    "ContextualInvite.share_this_page.subtitle2":
      "这些人只能访问此页面。他们不会添加到你的账单中。",
    "ContextualInvite.share_this_page.title": "仅分享此页面",
    "ContextualInvite.share_this_workspace.subtitle": "邀请到此空间作为成员",
    "ContextualInvite.share_this_workspace.subtitle2":
      "这些人员将有权访问与 {workspaceName} 中的工作区成员共享的所有内容。将新电子邮件添加为计费成员。",
    "ContextualInvite.share_this_workspace.title": "共享此工作区",
    "ContextualInviteEmail.pageInviteMessage": "{name} 邀请你加入 {pageName}",
    "ContextualInviteEmail.workspaceInviteMessage":
      "{name} 邀请你加入 {workspaceName}",
    "ContextualInviteEmail.workspaceInviteMessageFromBot":
      "你已被邀请加入 {workspaceName}",
    "ContextualInviteEmail.workspacePreview.numberOfMembers":
      "{numberOfMembers} 个成员",
    "ContexualInvites.inviteUserModal.searchInput.placeholder":
      "添加邮箱地址、人员、集成...",
    "ContexualInvites.inviteUserModal.searchInput.placeholderWithTeams":
      "添加电子邮件、人员、团队空间...",
    "CreateTeamspaceMenu.closedTeamspace.caption":
      "任何人都可以查看此团队空间，但无法参与",
    "CreateTeamspaceMenu.openTeamspace.caption":
      "任何人都可以查看和参与此团队空间",
    "CreateTeamspaceMenu.privateTeamspace.caption": "仅向成员显示此团队空间",
    "OnboardingSurvery.usecase.question.docs": "文档编辑和共享",
    "OnboardingSurvery.usecase.question.goals": "公司目标和 OKR",
    "OnboardingSurvery.usecase.question.other": "其他",
    "OnboardingSurvery.usecase.question.project": "项目管理",
    "OnboardingSurvery.usecase.question.wikis": "Wiki / 知识库",
    "OnboardingSurvey.usecase.question.notes": "个人笔记",
    "Outliner.showNMorePages": "还有 {hiddenPages} 页",
    "PermissionsInviteSearchRequest.userTooltip.admin":
      "点击以邀请 {userNameAndEmail}",
    "PermissionsInviteSearchRequest.userTooltip.guest":
      "{userNameAndEmail} 是此工作区的成员",
    "PermissionsInviteSearchRequest.userTooltip.invited_page":
      "{userNameAndEmail} 已受邀访问此页面",
    "PermissionsInviteSearchRequest.userTooltip.invited_space":
      "{userNameAndEmail} 已受邀加入此工作区",
    "PermissionsInviteSearchRequest.userTooltip.member":
      "{userNameAndEmail} 是此工作区的管理员",
    "PermissionsInviteSearchRequest.userTooltip.not_in_space":
      "{userNameAndEmail} 是此工作区的访客",
    "PersonaCollectionModal.initial.1000PlusLabel": "超过 1,001 人",
    "PersonaCollectionModal.initial.101_1000Label": "101 到 1,000 人",
    "PersonaCollectionModal.initial.1_100Label": "1 到 100 人",
    "PersonaCollectionModal.initial.caption":
      "我们想了解更多有关你的信息，以便我们可以让我们的产品更好地为你服务",
    "PersonaCollectionModal.initial.companySizeLabel": "公司规模",
    "PersonaCollectionModal.initial.header": "请更多地向我们介绍一下你自己",
    "PersonaCollectionModal.initial.questionLabel": "你打算用 Notion 做什么？",
    "PersonaCollectionModal.initial.roleLabel": "你的角色是什么？",
    "PersonaCollectionModal.initial.sendLabel": "提交",
    "PersonaCollectionModal.initial.workLabel": "你从事哪一类工作？",
    "PersonaCollectionModal.link.caption": "模板库",
    "PersonaCollectionModal.prompt.caption":
      "我们想更多地了解你，以便我们可以让我们的产品更好地为你服务",
    "PersonaCollectionModal.prompt.header": "请更多地介绍一下你自己",
    "PersonaCollectionModal.prompt.skipLabel": "跳过",
    "PersonaCollectionModal.prompt.survey": "参与 20 秒的问卷调查",
    "PersonaCollectionModal.selectQuestion.label": "选择回答",
    "PersonaCollectionModal.thanks.caption":
      "谢谢你！在<textlink>模板库中</textlink>发现使用 Notion 的新方法",
    "PersonaCollectionModalQuestionSelect.question.product": "产品管理",
    "PersonaCollectionModalQuestionSelect.question.roleLabel": "角色",
    "PersonaCollectionModalQuestionSelect.question.useLabel": "使用",
    "PersonaCollectionModalQuestionSelect.question.workLabel": "工作",
    "PersonaCollectionModalQuestionSelect.roleQuestion.dept_lead": "部门主管",
    "PersonaCollectionModalQuestionSelect.roleQuestion.exec":
      "行政人员（高层/副总裁）",
    "PersonaCollectionModalQuestionSelect.roleQuestion.member": "团队成员",
    "PersonaCollectionModalQuestionSelect.roleQuestion.personal":
      "只为自己使用 Notion",
    "PersonaCollectionModalQuestionSelect.roleQuestion.solo":
      "个人企业家/自由职业者",
    "PersonaCollectionModalQuestionSelect.roleQuestion.team_manager":
      "团队经理",
    "PersonaCollectionModalQuestionSelect.useQuestion.docs": "编辑和共享文档",
    "PersonaCollectionModalQuestionSelect.useQuestion.goals": "目标设置和跟踪",
    "PersonaCollectionModalQuestionSelect.useQuestion.notes": "个人笔记",
    "PersonaCollectionModalQuestionSelect.useQuestion.other": "其他",
    "PersonaCollectionModalQuestionSelect.useQuestion.project":
      "项目或任务管理",
    "PersonaCollectionModalQuestionSelect.useQuestion.wikis":
      "公司知识库/内部网",
    "PersonaCollectionModalQuestionSelect.workQuestion.design": "设计",
    "PersonaCollectionModalQuestionSelect.workQuestion.educator": "教育工作者",
    "PersonaCollectionModalQuestionSelect.workQuestion.eng": "工程",
    "PersonaCollectionModalQuestionSelect.workQuestion.finance": "金融",
    "PersonaCollectionModalQuestionSelect.workQuestion.hr": "人力资源",
    "PersonaCollectionModalQuestionSelect.workQuestion.it": "IT",
    "PersonaCollectionModalQuestionSelect.workQuestion.marketing": "市场营销",
    "PersonaCollectionModalQuestionSelect.workQuestion.operations": "运营",
    "PersonaCollectionModalQuestionSelect.workQuestion.other": "其他",
    "PersonaCollectionModalQuestionSelect.workQuestion.project":
      "项目/计划管理",
    "PersonaCollectionModalQuestionSelect.workQuestion.sales": "销售",
    "PersonaCollectionModalQuestionSelect.workQuestion.student": "学生",
    "PersonaCollectionModalQuestionSelect.workQuestion.support": "客户服务",
    "ReactionBar.emojiModalMenu.title": "反应",
    "ReactionBar.hoverTooltip.text":
      "{names} <medium>使用</medium> {icon} 做出反应。",
    "RelationPropertyPageSection.show.minimalRelations":
      "{numberOfRelations, plural, other {{propertyName} 中的 {numberOfRelations} 个链接页面}}",
    "SearchBadResultsForm.additionalInformation.placeholder":
      "任何其他评论或上下文（例如...）",
    "SearchBadResultsForm.cancelButton.label": "取消",
    "SearchBadResultsForm.reportButton.label": "提交",
    "SearchBadResultsForm.title": "报告错误搜索",
    "SearchBadResultsForm.url.placeholder": "链接到你正在查找的页面",
    "SearchResultsFooter.helpText.resultCount":
      "{resultCount, plural, other {<resultwrapper>{resultCount}</resultwrapper> 个结果}}",
    "SearchResultsFooter.helpText.resultCountApproximate":
      "{resultCount, plural, other {<resultwrapper>{resultCount}+</resultwrapper> 个结果}}",
    "SidebarDetailViewHeader.headers.favorites": "收藏夹",
    "SidebarDetailViewHeader.headers.private": "私人",
    "SidebarDetailViewHeader.headers.shared": "已共享",
    "SidebarDetailViewHeader.headers.workspace": "工作区",
    "SpecificTeamMemberToAddRow.addMemberButton.text": "添加",
    "SpecificTeamMemberToAddRow.team_invite_failure": "添加 {user} 失败",
    "TeamAccessLevelSwitcher.closeOrPrivateTeam.disabledTooltip":
      "你无法更改此设置，因为这是默认团队。请联系工作区管理员寻求帮助。",
    "TeamAccessLevelSwitcher.closeOrPrivateTeam.disabledTooltipNonAdmin":
      "你无法更改此设置，因为这是默认团队。请联系工作区管理员寻求帮助。",
    "TeamAccessLevelSwitcher.closeOrPrivateTeam.disabledTooltipOnlyDefaultTeam":
      "这是工作区中唯一的默认团队，并且默认团队必须处于开放状态。首先将另一个团队设置为默认团队。",
    "TeamAccessLevelSwitcher.closeOrPrivateTeamspace.disabledTooltipNonAdmin":
      "你无法更改此设置，因为这是默认团队空间。请联系你的工作区管理员以寻求帮助。",
    "TeamAccessLevelSwitcher.closeOrPrivateTeamspace.disabledTooltipOnlyDefaultTeam":
      "这是工作区中唯一的默认团队空间，必须打开默认团队空间。请先将另一个团队空间设为默认值。",
    "TeamAccessLevelSwitcher.closedTeam.caption":
      "任何人都可以查看，但不能加入",
    "TeamAccessLevelSwitcher.closedTeam.title": "封闭式",
    "TeamAccessLevelSwitcher.closedTeamSpace.title": "封闭式",
    "TeamAccessLevelSwitcher.closedTeamspace.caption":
      "任何人都可以看到但不能加入",
    "TeamAccessLevelSwitcher.openTeam.caption": "任何人都可以查看，并加入团队",
    "TeamAccessLevelSwitcher.openTeam.title": "开放式",
    "TeamAccessLevelSwitcher.openTeamspace.caption": "任何人都可以查看和加入",
    "TeamAccessLevelSwitcher.openTeamspace.title": "开放式",
    "TeamAccessLevelSwitcher.privateTeam.caption": "只有团队成员才能查看内容",
    "TeamAccessLevelSwitcher.privateTeam.title": "私人",
    "TeamAccessLevelSwitcher.privateTeamSpace.title": "私人",
    "TeamAccessLevelSwitcher.privateTeamspace.caption": "只有成员才能查看",
    "TeamAccessLevelSwitcher.privateTeamspaceUpsellBusiness.tooltip":
      "升级到商业版以启用私人团队空间",
    "TeamAccessLevelSwitcher.privateTeamspaceUpsellEnterprise.tooltip":
      "升级到企业版以启用私人团队空间",
    "TeamBreadcrumbPopup.morePages": "其他 {numberOfMorePages} 页…",
    "TeamBreadcrumbPopup.teamMemberCount":
      "{numberOfMembers, plural, other {{numberOfMembers} 位成员}}",
    "TeamMemberOwnerSelect.guestLabel": "访客",
    "TeamMemberOwnerSelect.memberCaption":
      "对团队空间页面拥有访问权限，但不能编辑团队空间设置",
    "TeamMemberOwnerSelect.memberItem.disableOwnerForGroupsTooltip":
      "组不能是团队空间所有者。",
    "TeamMemberOwnerSelect.memberItem.disableWithOnlyOneOwnerTooltip":
      "团队必须至少有一个所有者。首先让其他人成为所有者。",
    "TeamMemberOwnerSelect.memberLabel": "成员",
    "TeamMemberOwnerSelect.ownerCaption":
      "对团队空间页面拥有完全访问权限，并且可以编辑团队空间设置",
    "TeamMemberOwnerSelect.ownerLabel": "团队空间所有者",
    "TeamMemberOwnerSelect.permissionOverrideCaption":
      "自定义团队空间页面访问权限",
    "TeamMemberOwnerSelect.permissionsOverride": "自定义权限",
    "TeamMemberOwnerSelect.remove": "移除",
    "TeamMemberOwnerSelect.remove.disabledTooltip.cannotRemoveFromDefault":
      "无法从默认团队空间中移除成员。",
    "TeamMemberOwnerSelect.remove.disabledTooltip.multiple":
      "移除 {groupName} 和 {numMoreGroups} {numMoreGroups, plural, one {个群组 } other {个群组}}以移除此成员",
    "TeamMemberOwnerSelect.remove.disabledTooltip.single":
      "移除 {groupName} 以移除此成员",
    "TeamMemberOwnerSelect.remove.disabledTooltip.withoutGroupInfo":
      "此成员是通过工作区管理员管理的群组添加的。请与他们联系以删除此成员。",
    "TeamMemberOwnerSelect.roleName.comment_only": "可以评论",
    "TeamMemberOwnerSelect.roleName.content_only_editor": "可以编辑内容",
    "TeamMemberOwnerSelect.roleName.custom": "特别定制",
    "TeamMemberOwnerSelect.roleName.editor": "完整访问权限",
    "TeamMemberOwnerSelect.roleName.none": "无访问权限",
    "TeamMemberOwnerSelect.roleName.read_and_write": "可以编辑",
    "TeamMemberOwnerSelect.roleName.reader": "可以查看",
    "TeamMembersPermissionRow.teamPermissionItem.description":
      "{num, plural, other {{num} 个团队成员}}",
    "TeamMembersPermissionRow.teamspacePermissionItem.description":
      "{num, plural, other {{num} 个人}}",
    "TeamMembersTopSection.header.permissionsSectionTitle": "权限",
    "TeamMembersTopSection.permissionItem.defaultAccessSpaceName":
      "{spaceName} 中的其他所有人",
    "TeamMembersTopSection.permissionItem.defaultAccessTeamSpaceName":
      "团队空间成员",
    "TeamMembersTopSection.permissionItem.defaultAccessWithoutSpaceName":
      "工作区中的其他所有人",
    "TeamMembersTopSection.permissionItem.defaultAccessWithoutTeamspaceName":
      "团队空间成员",
    "TeamOwnersPermissionRow.permissionItem.teamspaceOwnersAccessToggleName":
      "团队空间所有者",
    "TeamOwnersPermissionRow.permissionItem.teamspaceOwnersAccessToggleNameWithoutTeamName":
      "团队空间所有者",
    "TeamOwnersPermissionRow.teamPermissionItem.description":
      "{num, plural, other {{num} 个团队所有者}}",
    "TeamOwnersPermissionRow.teamspaceOwnersRowTooltip":
      "默认情况下，团队空间所有者拥有对团队空间页面的完全访问权限",
    "TeamOwnersPermissionRow.teamspacePermissionItem.description":
      "{num, plural, other {{num} 个人}}",
    "TeamPermissionsInviteOverlay.membersTitle.label":
      "将人员添加到 {teamName}",
    "TeamPermissionsList.search.inThisTeam": "在这个团队中",
    "TeamPermissionsList.search.notInTeam": "不在团队中",
    "TeamPermissionsList.search.zeroState": "未找到成员",
    "TeamPermissionsListHeader.nameColumn": "名称",
    "TeamPermissionsListHeader.roleColumn": "角色",
    "TeamSettings.groups.noResult": "未找到任何群组",
    "TeamSettings.groups.numPeople":
      "{numUsers} {numUsers, plural, one {个人} other {个人}}",
    "TeamSettings.groups.remoevGroupButton": "移除群组",
    "TeamSettings.groups.removeGroupModal.confirmationButton": "移除群组",
    "TeamSettings.groups.removeGroupModal.description":
      "此组中的 {numGroupMembers} {numGroupMembers, plural, one {位成员} other {位成员}} 将从该团队空间中移除。",
    "TeamSettings.groups.removeGroupModal.title": "确定要移除 {groupName}？",
    "TeamSettings.groups.removeGroupModal.title.noGroupName":
      "确定要移除此群组？",
    "TeamSettings.groups.subtitle":
      "为团队成员设置群组。只有管理员才能访问群组。",
    "TeamSettings.groups.title": "群组",
    "TeamSettingsGeneral.generalSettings.description.title": "描述",
    "TeamSettingsGeneral.generalSettings.iconAndName.title": "图标和名称",
    "TeamSettingsGeneral.generalSettings.noDescription": "无描述",
    "TeamSettingsGeneral.generalSettings.subtitle":
      "编辑团队名称、描述或图标。",
    "TeamSettingsGeneral.generalSettings.title": "团队空间详细信息",
    "TeamSettingsGeneral.settingsChanged": "团队空间详细信息已更新。",
    "TeamSettingsMembers.title": "成员",
    "TeamSettingsPermissions.pagePermissions.subtitle":
      "选择用户默认拥有的页面权限。",
    "TeamSettingsPermissions.pagePermissions.title": "权限",
    "TeamSettingsPermissions.settingSelect.whoCanEditSidebarPinnedPages.upgradeToBusinessTooltip":
      "升级到商业版以更改此设置",
    "TeamSettingsPermissions.settingSelect.whoCanEditSidebarPinnedPages.upgradeToEnterpriseTooltip":
      "升级到企业版以更改此设置",
    "TeamSettingsPermissions.settingSelect.whoCanEditTeamspacePages.upgradeToBusinessTooltip":
      "升级到商业版以更改此设置",
    "TeamSettingsPermissions.settingSelect.whoCanEditTeamspacePages.upgradeToEnterpriseTooltip":
      "升级到企业版以更改此设置",
    "TeamSettingsPermissions.teamAccess.title": "团队访问权限",
    "TeamSettingsPermissions.teamPageAccess.title": "团队页面访问权限",
    "TeamSettingsPermissions.teamspaceAccess.title": "团队空间访问权限",
    "TeamSettingsPermissions.whoCanEditSidebarPinnedPages.caption":
      "添加、删除或重新排序团队侧边栏页面",
    "TeamSettingsPermissions.whoCanEditSidebarPinnedPages.teamMembersAndOwners.title":
      "任何团队成员",
    "TeamSettingsPermissions.whoCanEditSidebarPinnedPages.teamOwners.title":
      "仅限团队所有者",
    "TeamSettingsPermissions.whoCanEditSidebarPinnedPages.title":
      "谁可以编辑侧边栏固定页面",
    "TeamSettingsPermissions.whoCanEditTeamspacePages.caption":
      "添加、删除或重新排序团队空间侧边栏页面",
    "TeamSettingsPermissions.whoCanEditTeamspacePages.teamMembersAndOwners.title":
      "任何团队空间成员",
    "TeamSettingsPermissions.whoCanEditTeamspacePages.teamOwners.title":
      "仅团队空间所有者",
    "TeamSettingsPermissions.whoCanEditTeamspacePages.title":
      "谁可以编辑团队空间侧边栏",
    "TeamSettingsPermissions.whoCanInviteTeamMembers.caption":
      "谁可以向团队添加人员",
    "TeamSettingsPermissions.whoCanInviteTeamMembers.teamMembersAndOwners.title":
      "任何团队成员",
    "TeamSettingsPermissions.whoCanInviteTeamMembers.teamOwners.title":
      "仅限团队所有者",
    "TeamSettingsPermissions.whoCanInviteTeamMembers.title":
      "谁可以邀请团队成员",
    "TeamSettingsPermissions.whoCanInviteTeamspaceMembers.caption":
      "谁可以向团队空间添加人员",
    "TeamSettingsPermissions.whoCanInviteTeamspaceMembers.teamMembersAndOwners.title":
      "任何团队成员",
    "TeamSettingsPermissions.whoCanInviteTeamspaceMembers.teamOwners.title":
      "仅团队空间所有者",
    "TeamSettingsPermissions.whoCanInviteTeamspaceMembers.title":
      "谁可以邀请团队空间成员",
    "TeamSettingsPermissions.whoCanJoinTeam.everyoneInWorkspace.title":
      "工作区中的所有人",
    "TeamSettingsPermissions.whoCanJoinTeam.inviteOnly.title": "仅限邀请",
    "TeamSettingsPermissions.whoCanJoinTeam.title": "谁可以加入团队",
    "TeamSettingsPermissions.whoCanSeeTeam.everyoneInWorkspace.title":
      "工作区中的所有人",
    "TeamSettingsPermissions.whoCanSeeTeam.teamMembersOnly.title":
      "仅限团队成员和所有者",
    "TeamSettingsPermissions.whoCanSeeTeam.title": "谁可以看到团队",
    "TeamSettingsSecurity.title": "安全性",
    "TeamTeamMembersListSection.sectionTitle.members": "成员",
    "TeamTeamMembersListSection.sectionTitle.membersAndGroups": "成员和群组",
    "TemporarySignUpEmail.signUpLink.continuedBody":
      "附言：此链接对你是唯一的，当你使用上面的按钮或链接时，该链接将失效。因此，请不要与任何人分享！",
    "TemporarySignUpEmail.signUpLink.linkAlternative":
      "按钮不起作用？你也可以通过将此 URL 粘贴到浏览器中来完成注册：",
    "TemporarySignUpEmail.signUpLink.subjectLine": "完成注册 Notion",
    "TemporarySignUpEmail.signUpLink.titleOfEmail": "即将完成！",
    "TemporarySignUpEmail.signUpLink.titleOfEmail.actionLink":
      "继续前往 Notion",
    "TemporarySignUpEmail.signUpLink.titleOfEmail.text":
      "你的新 Notion 帐户创建很快就要完成了。点击下面的按钮继续：",
    "UpdateSidebarFollowControl.follow.caption": "接收所有更新和评论通知",
    "UpdateSidebarFollowControl.follow.label": "关注",
    "UpdateSidebarFollowControl.following.label": "关注中",
    "UpdateSidebarFollowControl.unfollow.caption": "不接收更新和评论通知",
    "UpdateSidebarFollowControl.unfollow.label": "取消关注",
    "abstractBlock.embeds.button.label": "嵌入 Abstract",
    "abstractBlock.embeds.caption": "适用于启用了公共访问的 Abstract 链接",
    "abstractBlock.placeholder": "嵌入 Abstract",
    "accountActions.deletingAccount.loadingMessage": "正在删除你的帐户…",
    "accountActions.deletingAccount.noUserToDeleteMessage":
      "没有要删除的帐户。",
    "action.addtoFavorites.name": "添加到最爱",
    "action.alignment.center.name": "居中",
    "action.alignment.left.name": "左对齐",
    "action.alignment.name": "对齐",
    "action.alignment.right.name": "右对齐",
    "action.backgroundColor.blue.fuzzySearchKeyword": "蓝色背景 Bluebackground",
    "action.backgroundColor.blue.name": "蓝色背景",
    "action.backgroundColor.brown.fuzzySearchKeyword":
      "棕色背景 Brownbackground",
    "action.backgroundColor.brown.name": "棕色背景",
    "action.backgroundColor.default.fuzzySearchKeyword":
      "Default Black White 默认 moren mo'ren 黑 hei 白 bai",
    "action.backgroundColor.default.name": "默认背景",
    "action.backgroundColor.gray.fuzzySearchKeyword":
      "Grey Gray background 灰色 huise hui'se 背景 beijing bei'jing",
    "action.backgroundColor.gray.name": "灰色背景",
    "action.backgroundColor.green.name": "绿色背景",
    "action.backgroundColor.orange.fuzzySearchKeyword":
      "橙色背景 Orangebackground",
    "action.backgroundColor.orange.name": "橙色背景",
    "action.backgroundColor.pink.fuzzySearchKeyword": "粉色背景 Pinkbackground",
    "action.backgroundColor.pink.name": "粉色背景",
    "action.backgroundColor.purple.fuzzySearchKeyword":
      "紫色背景 Purplebackground",
    "action.backgroundColor.purple.name": "紫色背景",
    "action.backgroundColor.red.fuzzySearchKeyword": "红色背景 Redbackground",
    "action.backgroundColor.red.name": "红色背景",
    "action.backgroundColor.teal.fuzzySearchKeyword":
      "蓝绿色背景 Tealbackground Greenbackground",
    "action.backgroundColor.yellow.fuzzySearchKeyword":
      "黄色背景 Yellowbackground",
    "action.backgroundColor.yellow.name": "黄色背景",
    "action.backtoNotion.name": "回到 Notion",
    "action.bold.name": "加粗",
    "action.calendarBy.name": "日历显示",
    "action.caption.name": "标题",
    "action.clearContents.title": "清除内容",
    "action.clearDate.name": "清除日期",
    "action.codePreviewSection.name": "在块中显示",
    "action.color.name": "颜色",
    "action.columnHeader.title": "标题行",
    "action.comment.name": "评论",
    "action.commentPage.name": "评论",
    "action.configure.name": "块设置",
    "action.copiedCodeToClipboard.snackBarMessage": "已将代码复制到剪贴板",
    "action.copiedLinkToClipboard.snackBarMessage": "已将链接复制到剪贴板",
    "action.copiedLinksToClipboard.snackBarMessage": "已将链接拷贝到剪贴板",
    "action.copiedPropertyToClipboard.snackBarMessage": "已将属性复制到剪贴板",
    "action.copiedToClipboard.snackBarMessage": "已复制到剪贴板",
    "action.copiedTokenToClipboard.snackBarMessage": "已将令牌拷贝到剪贴板",
    "action.copyDirectLink.name": "拷贝原始链接",
    "action.copyLink.name": "复制块链接",
    "action.copyLinkNavigableType.name": "拷贝链接",
    "action.copyLinkToCurrentPage.snackBarMessage":
      "指向当前页面的链接已复制到剪贴板。",
    "action.copyLinks.name": "拷贝全部链接",
    "action.copyLinktoView.name": "复制视图链接",
    "action.createEquation.name": "创建公式",
    "action.createLink.name": "创建链接",
    "action.createNotionPage.name": "创建您自己的 Notion 页面",
    "action.createTeamFromPage.caption": "团队自定义权限和协作的空间",
    "action.createTeamFromPage.name": "转换为团队空间",
    "action.customizeCollectionViewBlock.label": "编辑设置",
    "action.customizeCollectionViewBlock.label.dynamic":
      "编辑 {databaseName} 设置",
    "action.customizePage.label": "自定义页面",
    "action.darkMode.name": "深色模式",
    "action.databaseLock.label": "锁定数据库",
    "action.dateOrReminder.description": "在文本中插入日期或提醒。",
    "action.dateOrReminder.title": "日期或提醒",
    "action.delete.name": "删除",
    "action.deletePages.snackBarMessage": "已移至垃圾箱",
    "action.download.name": "下载",
    "action.duplicate.name": "创建副本",
    "action.duplicatePage.name": "创建副本页面",
    "action.duplicateTo.name": "保存副本到",
    "action.edit.name": "编辑",
    "action.editPage.name": "编辑",
    "action.editProperty.name": "编辑属性",
    "action.enter.name": "输入",
    "action.export.caption": "PDF、HTML、Markdown",
    "action.export.name": "导出",
    "action.filter.name": "筛选",
    "action.fontSmallText.fuzzySearchKeywords":
      "Font Small Text 字体 ziti zi'ti 字号 zihao zi'hao 小字 xiaozi xiao'zi",
    "action.fontSmallText.label": "小字号",
    "action.foregroundColor.blue.fuzzySearchKeyword": "蓝色",
    "action.foregroundColor.blue.name": "蓝色",
    "action.foregroundColor.brown.fuzzySearchKeyword": "棕色",
    "action.foregroundColor.brown.name": "棕色",
    "action.foregroundColor.default.name": "默认",
    "action.foregroundColor.gray.fuzzySearchKeyword":
      "Grey Gray 灰色 huise hui'se",
    "action.foregroundColor.gray.name": "灰色",
    "action.foregroundColor.green.name": "绿色",
    "action.foregroundColor.orange.fuzzySearchKeyword": "橙色",
    "action.foregroundColor.orange.name": "橙色",
    "action.foregroundColor.pink.fuzzySearchKeyword": "粉色",
    "action.foregroundColor.pink.name": "粉色",
    "action.foregroundColor.purple.fuzzySearchKeyword": "紫色",
    "action.foregroundColor.purple.name": "紫色",
    "action.foregroundColor.red.fuzzySearchKeyword": "红色",
    "action.foregroundColor.red.name": "红色",
    "action.foregroundColor.teal.fuzzySearchKeyword": "蓝绿色",
    "action.foregroundColor.yellow.fuzzySearchKeyword": "黄色",
    "action.foregroundColor.yellow.name": "黄色",
    "action.fullScreen.name": "全屏",
    "action.fullWidth.label": "全宽",
    "action.group.name": "分组",
    "action.groupBy.name": "分组",
    "action.highlight.name": "高亮",
    "action.import.name": "导入",
    "action.insertBelow.name": "在下面插入",
    "action.insertColumnLeft.title": "在左侧插入",
    "action.insertColumnRight.title": "在右侧插入",
    "action.insertEmoji.description": "搜索要放在文本中的表情符号。",
    "action.insertEmoji.title": "表情符号",
    "action.insertInlineEquation.description": "在文本中插入数学符号。",
    "action.insertInlineEquation.fuzzySearchKeyword":
      "LaTeX Math Inline Equation $ TeX LaTex 方程式 fangchengshi fang'cheng'shi 数学 shuxue shu'xue 行内 hangnei hang'nei 公式 gongshi gong'shi",
    "action.insertInlineEquation.title": "行内公式",
    "action.insertRowAbove.title": "在上方插入",
    "action.insertRowBelow.title": "在下方插入",
    "action.italic.name": "斜体",
    "action.languageMode.abap": "ABAP",
    "action.languageMode.agda": "Agda",
    "action.languageMode.arduino": "Arduino",
    "action.languageMode.bash": "Bash",
    "action.languageMode.basic": "Basic",
    "action.languageMode.bnf": "BNF",
    "action.languageMode.c": "C",
    "action.languageMode.clojure": "Clojure",
    "action.languageMode.coffeescript": "CoffeeScript",
    "action.languageMode.coq": "Coq",
    "action.languageMode.cplusplus": "C++",
    "action.languageMode.csharp": "C#",
    "action.languageMode.css": "CSS",
    "action.languageMode.cstyle": "Java/C/C++/C#",
    "action.languageMode.dart": "Dart",
    "action.languageMode.dhall": "Dhall",
    "action.languageMode.diff": "Diff",
    "action.languageMode.docker": "Docker",
    "action.languageMode.ebnf": "EBNF",
    "action.languageMode.elixir": "Elixir",
    "action.languageMode.elm": "Elm",
    "action.languageMode.erlang": "Erlang",
    "action.languageMode.flow": "Flow",
    "action.languageMode.fortran": "Fortran",
    "action.languageMode.fsharp": "F#",
    "action.languageMode.gherkin": "Gherkin",
    "action.languageMode.glsl": "GLSL",
    "action.languageMode.go": "Go",
    "action.languageMode.graphql": "Graphql",
    "action.languageMode.groovy": "Groovy",
    "action.languageMode.haskell": "Haskell",
    "action.languageMode.html": "HTML",
    "action.languageMode.idris": "Idris",
    "action.languageMode.java": "Java",
    "action.languageMode.javascript": "JavaScript",
    "action.languageMode.json": "JSON",
    "action.languageMode.julia": "Julia",
    "action.languageMode.kotlin": "Kotlin",
    "action.languageMode.latex": "LaTeX",
    "action.languageMode.less": "LESS",
    "action.languageMode.lisp": "Lisp",
    "action.languageMode.livescript": "LiveScript",
    "action.languageMode.llvm": "LLVM IR",
    "action.languageMode.lua": "Lua",
    "action.languageMode.makefile": "Makefile",
    "action.languageMode.markdown": "Markdown",
    "action.languageMode.markup": "Markup",
    "action.languageMode.mathematica": "Mathematica",
    "action.languageMode.matlab": "MATLAB",
    "action.languageMode.mermaid": "Mermaid",
    "action.languageMode.name": "语言设置",
    "action.languageMode.nasm": "汇编",
    "action.languageMode.nix": "Nix",
    "action.languageMode.objectiveC": "Objective-C",
    "action.languageMode.ocaml": "OCaml",
    "action.languageMode.pascal": "Pascal",
    "action.languageMode.perl": "Perl",
    "action.languageMode.php": "PHP",
    "action.languageMode.plaintext": "Plain Text",
    "action.languageMode.powershell": "Powershell",
    "action.languageMode.prolog": "Prolog",
    "action.languageMode.protobuf": "Protobuf",
    "action.languageMode.purescript": "PureScript",
    "action.languageMode.python": "Python",
    "action.languageMode.r": "R",
    "action.languageMode.racket": "Racket",
    "action.languageMode.reason": "Reason",
    "action.languageMode.ruby": "Ruby",
    "action.languageMode.rust": "Rust",
    "action.languageMode.sass": "Sass",
    "action.languageMode.scala": "Scala",
    "action.languageMode.scheme": "Scheme",
    "action.languageMode.scss": "SCSS",
    "action.languageMode.shell": "Shell",
    "action.languageMode.solidity": "坚固",
    "action.languageMode.sql": "SQL",
    "action.languageMode.swift": "Swift",
    "action.languageMode.toml": "TOML",
    "action.languageMode.typescript": "TypeScript",
    "action.languageMode.vbdotnet": "VB.net",
    "action.languageMode.verilog": "Verilog",
    "action.languageMode.vhdl": "VHDL",
    "action.languageMode.visualbasic": "Visual Basic",
    "action.languageMode.webassembly": "WebAssembly",
    "action.languageMode.xml": "XML",
    "action.languageMode.yaml": "YAML",
    "action.lastUsedHighlight.fuzzySearchKeywords":
      "Color last used 上次使用的颜色 shangcishiyongdeyanse shang'ci'shi'yong'de'yan'se 上次 shangci shang'ci 使用 shiyong shi'yong 颜色 yanse yan'se",
    "action.lastUsedHighlight.title": "上次使用",
    "action.leave.name": "离开",
    "action.listFormat.circle.name": "圆形",
    "action.listFormat.disc.name": "盘型",
    "action.listFormat.letters.default": "默认值",
    "action.listFormat.letters.name": "字母",
    "action.listFormat.letters.roman": "罗马数字",
    "action.listFormat.name": "列表格式",
    "action.listFormat.numbers.name": "数字",
    "action.listFormat.sectionName": "列表格式",
    "action.listFormat.square.name": "方形",
    "action.lockDatabaseName.name": "锁定数据库",
    "action.lockDatabaseViewsName.name": "锁定视图",
    "action.lockPage.name": "锁定页面",
    "action.logIn.name": "登录",
    "action.mentionPage.description": "提及页面并链接在文本中。",
    "action.mentionPage.title": "提及页面",
    "action.mentionPerson.description": "提及某人并向他们发送通知。",
    "action.mentionPerson.title": "提及人员",
    "action.mergewithCSV.name": "与 CSV 合并",
    "action.moveDown.name": "向下移动",
    "action.moveTo.name": "移动到",
    "action.moveUp.name": "向上移动",
    "action.newPageIn.name": "转换成页面到",
    "action.noDate.name": "无日期",
    "action.openAllToggles.name": "展开所有折叠列表",
    "action.openAsPage.name": "以全页面打开",
    "action.openInNewTab.name": "在新选项卡中打开",
    "action.openInNewWindow.name": "在新窗口中打开",
    "action.openPageInNewTab.name": "在新选项卡中打开页面",
    "action.openasPage.name": "以全页面打开",
    "action.openinAndroidApp.name": "在安卓应用中打开",
    "action.openinMacApp.name": "在 Mac 应用中打开",
    "action.openinWindowsApp.name": "在 Windows 应用中打开",
    "action.openiniOSApp.name": "在 iOS 应用中打开",
    "action.pageHistory.name": "页面历史记录",
    "action.pageUpdates.title": "更新页面",
    "action.paste.name": "粘贴",
    "action.properties.name": "属性",
    "action.propertyVisibility.label": "切换属性可见性",
    "action.quickFind.name": "快速查找",
    "action.quoteSize.default": "默认",
    "action.quoteSize.large": "大",
    "action.quoteSize.name": "引用大小",
    "action.redo.name": "重做",
    "action.reloadPreview": "重新加载预览",
    "action.reloadSyncedPage": "重新同步页面",
    "action.removefromFavorites.name": "从最爱中移除",
    "action.rename.name": "重命名",
    "action.replace.name": "替换",
    "action.reportPage.name": "报告页面",
    "action.resetZoom.name": "重置缩放",
    "action.resyncPage.name": "刷新离线数据",
    "action.rowHeader.title": "标题列",
    "action.search.name": "搜索",
    "action.search.noResults": "无结果",
    "action.section.actions": "动作",
    "action.section.advancedBlocks": "高级块",
    "action.section.background": "背景",
    "action.section.background.fuzzySearchKeywords":
      "Color Background 颜色 yanse yan'se 背景 beijing bei'jing",
    "action.section.backgroundColor": "背景颜色",
    "action.section.basicBlocks": "基本块",
    "action.section.color": "颜色",
    "action.section.database": "数据库",
    "action.section.embeds": "嵌入块",
    "action.section.fontStyle": "风格",
    "action.section.inline": "行内",
    "action.section.media": "媒体",
    "action.section.quoteSize": "引用大小",
    "action.section.simpleTableColumn": "列",
    "action.section.syncedDatabases": "同步的数据库",
    "action.section.textColor": "文本颜色",
    "action.section.turnInto": "转换成",
    "action.setPageFont.default.caption": "默认",
    "action.setPageFont.default.fuzzySearchKeywords":
      "Font Default 字体 ziti zi'ti 默认 moren mo'ren",
    "action.setPageFont.default.tooltip": "适合任何场景的无衬线字体",
    "action.setPageFont.mono.caption": "等宽体",
    "action.setPageFont.mono.fuzzySearchKeywords":
      "Font Mono 字体 ziti zi'ti 等宽体 dengkuanti deng'kuan'ti",
    "action.setPageFont.mono.tooltip": "适合草稿和笔记",
    "action.setPageFont.serif.caption": "衬线体",
    "action.setPageFont.serif.fuzzySearchKeywords":
      "Font Serif 字体 ziti zi'ti 衬线体 chenxianti chen'xian'ti",
    "action.setPageFont.serif.tooltip": "适合发表长文章",
    "action.shareLink.name": "分享链接",
    "action.showCodePreviewFormat.name": "预览",
    "action.showDeletedPages.name": "显示已删除的页面",
    "action.showOnlyCodeFormat.name": "代码",
    "action.showSplitViewFormat.name": "拆分",
    "action.signUpForNotion.name": "注册 Notion",
    "action.signUpOrlogIn.name": "注册或登录",
    "action.sort.name": "排序",
    "action.startPublicEditDialog.continueLabel": "继续",
    "action.startPublicEditDialog.message":
      "当你开始编辑时，页面所有者将可以看到你的姓名，邮箱地址和头像。",
    "action.strikeThrough.name": "删除线",
    "action.subGroupBy.name": "子组",
    "action.syncPage.name": "保存到离线",
    "action.templates.name": "模板",
    "action.timelineBy.name": "时间轴显示",
    "action.toggleRecordingInputLatency.name": "切换记录输入延迟",
    "action.turnInto.name": "转换成",
    "action.turnIntoCollection.title": "转换成数据库",
    "action.turnPreviewIntoMention": "转换为提及",
    "action.turnintoInline.name": "转换成内嵌",
    "action.turnintoPage.name": "转换成页面",
    "action.turnintoSimpleTable.name": "转换成简单的表格",
    "action.underline.name": "下划线",
    "action.undo.name": "撤消",
    "action.unlockDatabaseName.name": "解锁视图",
    "action.unlockPageName.name": "解锁页面",
    "action.unpin.name": "从侧边栏移除",
    "action.unsyncPage.name": "从离线中移除",
    "action.unsyncTransclusionContainer.fuzzySearchKeywords":
      "取消同步所有取消分组",
    "action.unsyncTransclusionContainerName.name": "禁用所有同步",
    "action.unsyncTransclusionReference.fuzzySearchKeywords":
      "取消同步取消分组",
    "action.unsyncTransclusionReference.name": "取消同步",
    "action.viewOriginal.name": "查看原始内容",
    "action.whatIsNotion.name": "Notion 是什么？",
    "action.workAtNotion.name": "在 Notion 中工作",
    "action.wrapAllColumns.name": "对所有列应用换行",
    "action.wrapCode.fuzzySearchKeywords":
      "Wrap Code 代码 daima dai'ma 换行 huanhang huan'hang",
    "action.wrapCode.label": "代码换行",
    "action.zoomIn.name": "放大",
    "action.zoomOut.name": "缩小",
    "activateReferral.dialogError.cannotInviteSelf.errorMessage":
      "你不能邀请自己",
    "activateReferral.dialogError.emailNotEligible.errorMessage":
      "此邮箱地址不符合引荐计划的使用条例。如果你认为这是个错误，请与支持人员联系。",
    "activateReferral.dialogError.invitationCreditAlreadyApplied.errorMessage":
      "你已经应用了邀请积分。",
    "activateReferral.dialogError.noValidReferral.errorMessage":
      "找不到有效的引荐。",
    "activateReferral.dialogError.referralAlreadyActivated.errorMessage":
      "引荐已被激活。",
    "activateReferral.dialogError.referringUserNotFound.errorMessage":
      "找不到引荐用户。",
    "activateReferral.dialogError.userAlreadySignedUp.errorMessage":
      "用户已注册。",
    "activity.accessRequested.header":
      "{activity.accessRequested.header, plural, other {{authorOrAuthors} 请求访问 {pageName}}}",
    "activity.accessRequested.messageLabel": "来自{author}的消息",
    "activity.actions.unarchiveButton.label": "取消归档",
    "activity.blockEdited.header":
      "{activity.blockEdited.header, plural, other {{authorOrAuthors} 编辑了 {pageTitle}}}",
    "activity.collectionCreated.header":
      "{activity.collectionCreated.header, plural, other {{authorOrAuthors} 创建了 {collectionTitle}}}",
    "activity.collectionEdited.header":
      "{activity.collectionEdited.header, plural, other {{authorOrAuthors} 编辑了 {collectionTitle}}}",
    "activity.collectionPropertyCreated.header":
      "{activity.collectionPropertyCreated.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中创建了属性 {collectionPropertyTitle}}}",
    "activity.collectionPropertyDeleted.header":
      "{activity.collectionPropertyDeleted.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中删除了属性 {collectionPropertyTitle}}}",
    "activity.collectionPropertyEdited.header":
      "{activity.collectionPropertyEdited.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中编辑了属性 {collectionPropertyTitle}}}",
    "activity.collectionRowCreated.header":
      "{activity.collectionRowCreated.header, plural, other {{authorOrAuthors} 创建了 {pageTitle}}}",
    "activity.collectionRowDeleted.header":
      "{activity.collectionRowDeleted.header, plural, other {{authorOrAuthors} 删除了 {pageTitle}}}",
    "activity.collectionViewCreated.header":
      "{activity.collectionViewCreated.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中创建了视图 {collectionViewTitle}}}",
    "activity.collectionViewDeleted.header":
      "{activity.collectionViewDeleted.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中删除了视图 {collectionViewTitle}}}",
    "activity.collectionViewEdited.header":
      "{activity.collectionViewEdited.header, plural, other {{authorOrAuthors} 在 {collectionTitle} 中编辑了视图 {collectionViewTitle}}}",
    "activity.commentActivity.header":
      "{activity.commentActivity.header, plural, other {{authorOrAuthors} 评论了 {blockName}}}",
    "activity.deletedGroup.placeholder": "已删除的群组",
    "activity.emailEdited.header":
      "{activity.emailEdited.header, plural, other {{authorOrAuthors} 将邮箱地址从 {oldEmail} 更改为 {newEmail}}}",
    "activity.mentionActivity.header":
      "{activity.mentionActivity.header, plural, other {{authorOrAuthors} 在 {pageName} 中提及了您}}",
    "activity.pageLocked.header":
      "{activity.pageLocked.header, plural, other {{authorOrAuthors} 锁定了 {blockTitle}}}",
    "activity.pageUnlocked.header":
      "{activity.pageUnlocked.header, plural, other {{authorOrAuthors} 解锁了 {blockTitle}}}",
    "activity.permissionGroupTitles.deletedGroup": "已删除的群组",
    "activity.permissionGroupTitles.untitledGroup": "无标题群组",
    "activity.permissionsActivity.header":
      "{activity.permissionsActivity.header, plural, other {{authorOrAuthors} 加入了 {pageOrSpaceName}}}",
    "activity.refollowPageButton.label": "重新关注此页面",
    "activity.reminderInActivity.header": "{pageTitle}中的提醒",
    "activity.replyButton.label": "回复",
    "activity.restorePermissionsForActivity.header":
      "{activity.restorePermissionsForActivity.header, plural, other {{authorOrAuthors} 恢复了继承的 {pageOrSpaceName} 访问权限}}",
    "activity.restrictPermissionsForActivity.header":
      "{activity.restrictPermissionsForActivity.header, plural, other {{authorOrAuthors} 限制了 {pageOrSpaceName} 的访问权限}}",
    "activity.topLevelBlockPrivateCreated.header":
      "{activity.topLevelBlockPrivateCreated.header, plural, other {{authorOrAuthors} 创建了私人页面 {pageTitle}}}",
    "activity.topLevelBlockPrivateDeleted.header":
      "{activity.topLevelBlockPrivateDeleted.header, plural, other {{authorOrAuthors} 删除了私人页面 {pageTitle}}}",
    "activity.topLevelBlockWorkspaceCreated.header":
      "{activity.topLevelBlockWorkspaceCreated.header, plural, other {{authorOrAuthors} 创建了工作区页面 {pageTitle}}}",
    "activity.topLevelBlockWorkspaceDeleted.header":
      "{activity.topLevelBlockWorkspaceDeleted.header, plural, other {{authorOrAuthors} 删除了工作区页面 {pageTitle}}}",
    "activity.unarchiveButton.label": "取消归档",
    "activity.unfollowPageButton.label": "取消关注此页面",
    "activity.untitledGroup.placeholder": "无标题的群组",
    "activity.untitledPlaceholder": "无标题",
    "activity.updatedPermissionGroupCreated.header":
      "{activity.updatedPermissionGroupCreated.header, plural, other {{authorOrAuthors} 创建了 {groupName} 群组}}",
    "activity.updatedPermissionGroupDeleted.header":
      "{activity.updatedPermissionGroupDeleted.header, plural, other {{authorOrAuthors} 删除了 {groupName} 群组}}",
    "activity.updatedPermissionGroupEdit.header":
      "{activity.updatedPermissionGroupEdit.header, plural, other {{authorOrAuthors} 编辑了 {groupName} 群组}}",
    "activity.updatedPermissionGroupEditedDefault.header":
      "{activity.updatedPermissionGroupEditedDefault.header, plural, other {{authorOrAuthors} 编辑了 {groupName} 群组}}",
    "activity.updatedPermissionsForActivity.header":
      "{activity.updatedPermissionsForActivity.header, plural, other {{authorOrAuthors} 更新了 {pageOrSpaceName} 的权限}}",
    "activity.userInvitedActivityGroupId.header":
      "{activity.userInvitedActivityGroupId.header, plural, other {{authorOrAuthors} 将您加入了 {groupName} 群组}}",
    "activity.userInvitedActivityGroupIdByBot.header":
      "你已被添加到{groupName}群组}}",
    "activity.userInvitedActivityNavigableBlock.header":
      "{activity.userInvitedActivityNavigableBlock.header, plural, other {{authorOrAuthors} 邀请您加入 {blockName}}}",
    "activity.userInvitedActivityNavigableBlockByBot.header":
      "你已被邀请加入{blockName}",
    "activity.userInvitedActivityOtherInvite.header":
      "{activity.userInvitedActivityOtherInvite.header, plural, other {{authorOrAuthors} 邀请您加入 {spaceName}}}",
    "activity.userInvitedActivityOtherInviteByBot.header":
      "你已被邀请加入{spaceName}",
    "activity.userInvitedToTeamActivity.header":
      "{activity.userInvitedToTeamActivity.header, plural, other {{authorOrAuthors} 邀请您加入 {teamName} 团队}}",
    "activity.viewMoreButton.label": "查看其余 {moreCount} 项",
    "activitySection.archiveAction.tooltip": "归档此通知",
    "activitySection.authorPhrase.forMoreThanTwoAuthors.label":
      "{numberOfOtherAuthors, plural, other {<b>{firstAuthor}</b>、<b>{secondAuthor}</b>及其他 {numberOfOtherAuthors} 位}}",
    "activitySection.authorPhrase.forNoAuthors.label": "某人",
    "activitySection.authorPhrase.forOneAuthor.label": "<b>{author}</b>",
    "activitySection.authorPhrase.forTwoAuthors.label":
      "<b>{firstAuthor}</b>和<b>{secondAuthor}</b>",
    "activitySection.viewVersionForUpdate.tooltip": "查看本次更新后的版本",
    "activityUpdate.unknownErrorLoadingActivities.message": "出了些问题。",
    "activityUpdates.clearFilters": "清除",
    "activityUpdates.filterMenu.byDate": "日期范围",
    "activityUpdates.filterMenu.byType.addItemLabel": "添加活动类型",
    "activityUpdates.filterMenu.byType.resultSectionTitle": "活动类型",
    "activityUpdates.filterMenu.byType.title": "搜索类型",
    "activityUpdates.offlineMessage": "请连接网络后查看动态。",
    "actorHelpers.anonymousPlaceholder": "匿名",
    "actorHelpers.userFullName": "{lastName} {firstName}",
    "adminAPIRequest.loadingMessage": "载入中…",
    "adminConnectionsSettings.autoApproveBuiltByNotion.caption":
      "启动此选项，以批准所有工作区成员安装<helpcenterlink>由 Notion 构建</helpcenterlink>的连接。",
    "adminConnectionsSettings.autoApproveBuiltByNotion.title":
      "自动批准<builtbynotion>由 Notion 构建</builtbynotion>的连接",
    "adminConnectionsSettings.connectionRestrictions.allowList.caption":
      "工作区成员只能安装由管理员预先批准的连接。",
    "adminConnectionsSettings.connectionRestrictions.info.title":
      "管理员可以随时安装和批准新连接。",
    "adminConnectionsSettings.connectionRestrictions.off.caption":
      "工作区成员可以安装任何连接。",
    "adminConnectionsSettings.requireApprovalSetting.allowList.caption":
      "工作区成员只能安装由管理员预先批准的连接。",
    "adminConnectionsSettings.requireApprovalSetting.allowList.workspaceOwner.caption":
      "工作区成员只能安装由工作区所有者预先批准的连接。",
    "adminConnectionsSettings.requireApprovalSetting.off.caption":
      "工作区成员可以安装任何新连接。",
    "adminConnectionsSettings.requireApprovalSetting.title": "禁止成员安装连接",
    "adminConnectionsSettings.search.button.label":
      "{plusIcon}&nbsp;添加已批准的连接",
    "adminConnectionsSettings.search.input.placeholder": "按名称或集成 ID 添加",
    "adminConnectionsSettings.table.allowIntegrations.title":
      "已批准的连接 {numberOfIntegrations}",
    "adminConnectionsSettings.table.default.title":
      "所有连接 {numberOfIntegrations}",
    "adminIntegrationSettings.autoApproveBuiltByNotion.builtbyNotion.link":
      "由 Notion 构建",
    "adminIntegrationSettings.autoApproveBuiltByNotion.caption":
      "启动此选项，批准所有工作区成员安装 <helpcenterlink>Built by Notion</helpcenterlink> 集成。",
    "adminIntegrationSettings.autoApproveBuiltByNotion.title":
      "自动批准 <builtbynotion>Built by Notion</builtbynotion> 集成",
    "adminIntegrationSettings.integrationRestrictions.allowList.caption":
      "工作区成员只能安装由管理员预先批准的集成。",
    "adminIntegrationSettings.integrationRestrictions.allowList.title":
      "从批准列表中",
    "adminIntegrationSettings.integrationRestrictions.allowList.workspaceOwners.caption":
      "工作区成员只能安装由工作区所有者预先批准的集成。",
    "adminIntegrationSettings.integrationRestrictions.info.title":
      "管理员可以随时安装和批准新的集成。",
    "adminIntegrationSettings.integrationRestrictions.off.caption":
      "工作区成员可以安装任何集成。",
    "adminIntegrationSettings.integrationRestrictions.off.title": "关闭",
    "adminIntegrationSettings.requireApprovalSetting.allowList.caption":
      "工作区成员只能安装由管理员预先批准的集成。",
    "adminIntegrationSettings.requireApprovalSetting.allowList.workspaceOwner.caption":
      "工作区成员只能安装由工作区所有者预先批准的集成。",
    "adminIntegrationSettings.requireApprovalSetting.off.caption":
      "工作区成员可以安装任何新集成。",
    "adminIntegrationSettings.requireApprovalSetting.title": "禁止成员安装集成",
    "adminIntegrationSettings.search.button.label":
      "{plusIcon}&nbsp; 添加批准的集成",
    "adminIntegrationSettings.search.input.placeholder": "按名称或集成 ID 添加",
    "adminIntegrationSettings.search.label.noResults": "无结果",
    "adminIntegrationSettings.search.subtitle.notionBuilt": "由 Notion 开发",
    "adminIntegrationSettings.search.title.popularIntegrations": "热门集成",
    "adminIntegrationSettings.table.allowIntegrations.title":
      "批准的集成 {numberOfIntegrations}",
    "adminIntegrationSettings.table.default.title": "所有集成",
    "adminLoginAsUser.loggingInAs.loadingMessage": "以 {userEmail} 登录",
    "aliasBlock.comment.noAccess.subtitle": "你无权查看此页面及其评论",
    "aliasBlock.comment.noAccess.title": "无权访问页面评论",
    "allTimeZones.Africa/Abidjan": "非洲/阿比让",
    "allTimeZones.Africa/Accra": "非洲/阿克拉",
    "allTimeZones.Africa/Addis_Ababa": "非洲/亚的斯亚贝巴",
    "allTimeZones.Africa/Algiers": "非洲/阿尔及尔",
    "allTimeZones.Africa/Asmara": "非洲/阿斯马拉",
    "allTimeZones.Africa/Asmera": "非洲/阿斯梅拉",
    "allTimeZones.Africa/Bamako": "非洲/巴马科",
    "allTimeZones.Africa/Bangui": "非洲/班吉",
    "allTimeZones.Africa/Banjul": "非洲/班珠尔",
    "allTimeZones.Africa/Bissau": "非洲/比绍",
    "allTimeZones.Africa/Blantyre": "非洲/布兰太尔",
    "allTimeZones.Africa/Brazzaville": "非洲/布拉柴维尔",
    "allTimeZones.Africa/Bujumbura": "非洲/布琼布拉",
    "allTimeZones.Africa/Cairo": "非洲/开罗",
    "allTimeZones.Africa/Casablanca": "非洲/卡萨布兰卡",
    "allTimeZones.Africa/Ceuta": "非洲/休达",
    "allTimeZones.Africa/Conakry": "非洲/科纳克里",
    "allTimeZones.Africa/Dakar": "非洲/达喀尔",
    "allTimeZones.Africa/Dar_es_Salaam": "非洲/达累斯萨拉姆",
    "allTimeZones.Africa/Djibouti": "非洲/吉布提",
    "allTimeZones.Africa/Douala": "非洲/杜阿拉",
    "allTimeZones.Africa/El_Aaiun": "非洲/阿尤恩",
    "allTimeZones.Africa/Freetown": "非洲/弗里敦",
    "allTimeZones.Africa/Gaborone": "非洲/哈博罗内",
    "allTimeZones.Africa/Harare": "非洲/哈拉雷",
    "allTimeZones.Africa/Johannesburg": "非洲/约翰内斯堡",
    "allTimeZones.Africa/Juba": "非洲/朱巴",
    "allTimeZones.Africa/Kampala": "非洲/坎帕拉",
    "allTimeZones.Africa/Khartoum": "非洲/喀土穆",
    "allTimeZones.Africa/Kigali": "非洲/基加利",
    "allTimeZones.Africa/Kinshasa": "非洲/金沙萨",
    "allTimeZones.Africa/Lagos": "非洲/拉各斯",
    "allTimeZones.Africa/Libreville": "非洲/利伯维尔",
    "allTimeZones.Africa/Lome": "非洲/洛美",
    "allTimeZones.Africa/Luanda": "非洲/罗安达",
    "allTimeZones.Africa/Lubumbashi": "非洲/卢本巴希",
    "allTimeZones.Africa/Lusaka": "非洲/卢萨卡",
    "allTimeZones.Africa/Malabo": "非洲/马拉博",
    "allTimeZones.Africa/Maputo": "非洲/马普托",
    "allTimeZones.Africa/Maseru": "非洲/马塞卢",
    "allTimeZones.Africa/Mbabane": "非洲/姆巴巴纳",
    "allTimeZones.Africa/Mogadishu": "非洲/摩加迪沙",
    "allTimeZones.Africa/Monrovia": "非洲/蒙罗维亚",
    "allTimeZones.Africa/Nairobi": "非洲/内罗毕",
    "allTimeZones.Africa/Ndjamena": "非洲/恩贾梅纳",
    "allTimeZones.Africa/Niamey": "非洲/尼亚美",
    "allTimeZones.Africa/Nouakchott": "非洲/努瓦克肖特",
    "allTimeZones.Africa/Ouagadougou": "非洲/瓦加杜古",
    "allTimeZones.Africa/Porto-Novo": "非洲/波多诺伏",
    "allTimeZones.Africa/Sao_Tome": "非洲/圣多美",
    "allTimeZones.Africa/Timbuktu": "非洲/廷巴克图",
    "allTimeZones.Africa/Tripoli": "非洲/的黎波里",
    "allTimeZones.Africa/Tunis": "非洲/突尼斯",
    "allTimeZones.Africa/Windhoek": "非洲/温得和克",
    "allTimeZones.America/Adak": "美洲/阿达克",
    "allTimeZones.America/Anchorage": "美洲/安克雷奇",
    "allTimeZones.America/Anguilla": "美洲/安圭拉",
    "allTimeZones.America/Antigua": "美洲/安提瓜",
    "allTimeZones.America/Araguaina": "美洲/阿拉瓜伊纳",
    "allTimeZones.America/Argentina/Buenos_Aires": "美洲/阿根廷/布宜诺斯艾利斯",
    "allTimeZones.America/Argentina/Catamarca": "美洲/阿根廷/卡塔马卡",
    "allTimeZones.America/Argentina/ComodRivadavia":
      "美洲/阿根廷/ComodRivadavia",
    "allTimeZones.America/Argentina/Cordoba": "美洲/阿根廷/科尔多瓦",
    "allTimeZones.America/Argentina/Jujuy": "美洲/阿根廷/胡胡伊",
    "allTimeZones.America/Argentina/La_Rioja": "美洲/阿根廷/拉里奥哈",
    "allTimeZones.America/Argentina/Mendoza": "美洲/阿根廷/门多萨",
    "allTimeZones.America/Argentina/Rio_Gallegos": "美洲/阿根廷/里奥加耶戈斯",
    "allTimeZones.America/Argentina/Salta": "美洲/阿根廷/萨尔塔",
    "allTimeZones.America/Argentina/San_Juan": "美洲/阿根廷/圣胡安",
    "allTimeZones.America/Argentina/San_Luis": "美洲/阿根廷/圣路易斯",
    "allTimeZones.America/Argentina/Tucuman": "美洲/阿根廷/图库曼",
    "allTimeZones.America/Argentina/Ushuaia": "美洲/阿根廷/乌斯怀亚",
    "allTimeZones.America/Aruba": "美洲/阿鲁巴",
    "allTimeZones.America/Asuncion": "美洲/亚松森",
    "allTimeZones.America/Atikokan": "美洲/阿蒂科肯",
    "allTimeZones.America/Atka": "美洲/阿特卡",
    "allTimeZones.America/Bahia": "美洲/巴伊亚",
    "allTimeZones.America/Bahia_Banderas": "美洲/班德拉斯海湾",
    "allTimeZones.America/Barbados": "美洲/巴巴多斯",
    "allTimeZones.America/Belem": "美洲/贝伦",
    "allTimeZones.America/Belize": "美洲/伯利兹",
    "allTimeZones.America/Blanc-Sablon": "美洲/勃朗峰-萨伯隆",
    "allTimeZones.America/Boa_Vista": "美洲/博阿维斯塔",
    "allTimeZones.America/Bogota": "美洲/波哥大",
    "allTimeZones.America/Boise": "美洲/博伊西",
    "allTimeZones.America/Buenos_Aires": "美洲/布宜诺斯艾利斯",
    "allTimeZones.America/Cambridge_Bay": "美洲/剑桥湾",
    "allTimeZones.America/Campo_Grande": "美洲/大坎普",
    "allTimeZones.America/Cancun": "美洲/坎昆",
    "allTimeZones.America/Caracas": "美洲/加拉加斯",
    "allTimeZones.America/Catamarca": "美洲/卡塔马卡",
    "allTimeZones.America/Cayenne": "美洲/卡宴",
    "allTimeZones.America/Cayman": "美洲/开曼",
    "allTimeZones.America/Chicago": "美洲/芝加哥",
    "allTimeZones.America/Chihuahua": "美洲/奇瓦瓦",
    "allTimeZones.America/Coral_Harbour": "美洲/科勒尔港",
    "allTimeZones.America/Cordoba": "美洲/科尔多瓦",
    "allTimeZones.America/Costa_Rica": "美洲/哥斯达黎加",
    "allTimeZones.America/Creston": "美洲/克雷斯顿",
    "allTimeZones.America/Cuiaba": "美洲/库亚巴",
    "allTimeZones.America/Curacao": "美洲/库拉索",
    "allTimeZones.America/Danmarkshavn": "美洲/丹麦港",
    "allTimeZones.America/Dawson": "美洲/道森",
    "allTimeZones.America/Dawson_Creek": "美洲/道森克里克",
    "allTimeZones.America/Denver": "美洲/丹佛",
    "allTimeZones.America/Detroit": "美洲/底特律",
    "allTimeZones.America/Dominica": "美洲/多米尼克",
    "allTimeZones.America/Edmonton": "美洲/埃德蒙顿",
    "allTimeZones.America/Eirunepe": "美洲/埃鲁内佩",
    "allTimeZones.America/El_Salvador": "美洲/萨尔瓦多",
    "allTimeZones.America/Ensenada": "美洲/恩塞纳达",
    "allTimeZones.America/Fort_Nelson": "美洲/纳尔逊堡",
    "allTimeZones.America/Fort_Wayne": "美国/韦恩堡",
    "allTimeZones.America/Fortaleza": "美洲/福塔雷萨",
    "allTimeZones.America/Glace_Bay": "美洲/格莱斯湾",
    "allTimeZones.America/Godthab": "美洲/戈特霍布",
    "allTimeZones.America/Goose_Bay": "美洲/古斯湾",
    "allTimeZones.America/Grand_Turk": "美洲/大特克斯岛",
    "allTimeZones.America/Grenada": "美洲/格林纳达",
    "allTimeZones.America/Guadeloupe": "美洲/瓜德罗普岛",
    "allTimeZones.America/Guatemala": "美洲/危地马拉",
    "allTimeZones.America/Guayaquil": "美洲/瓜亚基尔",
    "allTimeZones.America/Guyana": "美洲/圭亚那",
    "allTimeZones.America/Halifax": "美洲/哈利法克斯",
    "allTimeZones.America/Havana": "美洲/哈瓦那",
    "allTimeZones.America/Hermosillo": "美洲/埃莫西约",
    "allTimeZones.America/Indiana/Indianapolis":
      "美洲/印第安纳州/印第安纳波利斯",
    "allTimeZones.America/Indiana/Knox": "美洲/印第安纳州/诺克斯",
    "allTimeZones.America/Indiana/Marengo": "美洲/印第安纳州/马伦戈",
    "allTimeZones.America/Indiana/Petersburg": "美洲/印第安纳州/彼得斯堡",
    "allTimeZones.America/Indiana/Tell_City": "美洲/印第安纳州/特尔城",
    "allTimeZones.America/Indiana/Vevay": "美洲/印第安纳州/韦韦",
    "allTimeZones.America/Indiana/Vincennes": "美洲/印第安纳州/文森斯",
    "allTimeZones.America/Indiana/Winamac": "美洲/印第安纳州/维纳马克",
    "allTimeZones.America/Indianapolis": "美洲/印第安纳波利斯",
    "allTimeZones.America/Inuvik": "美洲/伊努维克",
    "allTimeZones.America/Iqaluit": "美洲/伊卡卢伊特",
    "allTimeZones.America/Jamaica": "美洲/牙买加",
    "allTimeZones.America/Jujuy": "美洲/胡胡伊",
    "allTimeZones.America/Juneau": "美洲/朱诺",
    "allTimeZones.America/Kentucky/Louisville": "美洲/肯塔基州/路易斯维尔",
    "allTimeZones.America/Kentucky/Monticello": "美洲/肯塔基州/蒙蒂塞洛",
    "allTimeZones.America/Knox_IN": "美洲/Knox_IN",
    "allTimeZones.America/Kralendijk": "美洲/克拉伦代克",
    "allTimeZones.America/La_Paz": "美洲/拉巴斯",
    "allTimeZones.America/Lima": "美洲/利马",
    "allTimeZones.America/Los_Angeles": "美洲/洛杉矶",
    "allTimeZones.America/Louisville": "美洲/路易斯维尔",
    "allTimeZones.America/Lower_Princes": "美洲/圣马丁岛",
    "allTimeZones.America/Maceio": "美洲/马塞约",
    "allTimeZones.America/Managua": "美洲/马那瓜",
    "allTimeZones.America/Manaus": "美洲/马瑙斯",
    "allTimeZones.America/Marigot": "美洲/马里戈特",
    "allTimeZones.America/Martinique": "美洲/马提尼克",
    "allTimeZones.America/Matamoros": "美洲/马塔莫罗斯",
    "allTimeZones.America/Mazatlan": "美洲/马萨特兰",
    "allTimeZones.America/Mendoza": "美洲/门多萨",
    "allTimeZones.America/Menominee": "美洲/梅诺米尼",
    "allTimeZones.America/Merida": "美洲/梅里达",
    "allTimeZones.America/Metlakatla": "美洲/梅特拉卡特拉",
    "allTimeZones.America/Mexico_City": "美洲/墨西哥城",
    "allTimeZones.America/Miquelon": "美洲/密克隆",
    "allTimeZones.America/Moncton": "美洲/蒙克顿",
    "allTimeZones.America/Monterrey": "美洲/蒙特雷",
    "allTimeZones.America/Montevideo": "美洲/蒙得维的亚",
    "allTimeZones.America/Montreal": "美洲/蒙特利尔",
    "allTimeZones.America/Montserrat": "美洲/蒙特塞拉特",
    "allTimeZones.America/Nassau": "美洲/拿骚",
    "allTimeZones.America/New_York": "美洲/纽约",
    "allTimeZones.America/Nipigon": "美洲/尼皮贡",
    "allTimeZones.America/Nome": "美洲/诺姆",
    "allTimeZones.America/Noronha": "美洲/诺罗尼亚",
    "allTimeZones.America/North_Dakota/Beulah": "美洲/北达科他州/比乌拉",
    "allTimeZones.America/North_Dakota/Center": "美洲/北达科他州/中部",
    "allTimeZones.America/North_Dakota/New_Salem": "美洲/北达科他州/新塞勒姆",
    "allTimeZones.America/Ojinaga": "美洲/奥希纳加",
    "allTimeZones.America/Panama": "美洲/巴拿马",
    "allTimeZones.America/Pangnirtung": "美洲/旁纳唐",
    "allTimeZones.America/Paramaribo": "美洲/帕拉马里博",
    "allTimeZones.America/Phoenix": "美洲/菲尼克斯",
    "allTimeZones.America/Port-au-Prince": "美洲/太子港",
    "allTimeZones.America/Port_of_Spain": "美洲/西班牙港",
    "allTimeZones.America/Porto_Acre": "美洲/阿克雷港",
    "allTimeZones.America/Porto_Velho": "美洲/波多韦柳",
    "allTimeZones.America/Puerto_Rico": "美洲/波多黎各",
    "allTimeZones.America/Punta_Arenas": "美洲/蓬塔阿雷纳斯",
    "allTimeZones.America/Rainy_River": "美洲/雷尼河",
    "allTimeZones.America/Rankin_Inlet": "美洲/兰京海口",
    "allTimeZones.America/Recife": "美洲/累西腓",
    "allTimeZones.America/Regina": "美洲/里贾纳",
    "allTimeZones.America/Resolute": "美洲/雷索卢特",
    "allTimeZones.America/Rio_Branco": "美洲/里奥布朗库",
    "allTimeZones.America/Rosario": "美洲/罗萨里奥",
    "allTimeZones.America/Santa_Isabel": "美洲/圣伊萨贝尔",
    "allTimeZones.America/Santarem": "美洲/圣塔伦",
    "allTimeZones.America/Santiago": "美洲/圣地亚哥",
    "allTimeZones.America/Santo_Domingo": "美洲/圣多明各",
    "allTimeZones.America/Sao_Paulo": "美洲/圣保罗",
    "allTimeZones.America/Scoresbysund": "美洲/斯科斯比松",
    "allTimeZones.America/Shiprock": "美洲/希普罗克",
    "allTimeZones.America/Sitka": "美洲/锡特卡",
    "allTimeZones.America/St_Barthelemy": "美洲/圣巴夫林米",
    "allTimeZones.America/St_Johns": "美洲/圣约翰斯",
    "allTimeZones.America/St_Kitts": "美洲/圣基茨",
    "allTimeZones.America/St_Lucia": "美洲/圣卢西亚",
    "allTimeZones.America/St_Thomas": "美洲/圣托马斯",
    "allTimeZones.America/St_Vincent": "美洲/圣文森特",
    "allTimeZones.America/Swift_Current": "美洲/斯威夫特卡伦特",
    "allTimeZones.America/Tegucigalpa": "美洲/特古西加尔巴",
    "allTimeZones.America/Thule": "美洲/图勒",
    "allTimeZones.America/Thunder_Bay": "美洲/桑德贝",
    "allTimeZones.America/Tijuana": "美洲/蒂华纳",
    "allTimeZones.America/Toronto": "美洲/多伦多",
    "allTimeZones.America/Tortola": "美洲/托托拉岛",
    "allTimeZones.America/Vancouver": "美洲/温哥华",
    "allTimeZones.America/Virgin": "美洲/维尔京",
    "allTimeZones.America/Whitehorse": "美洲/怀特霍斯",
    "allTimeZones.America/Winnipeg": "美洲/温尼伯",
    "allTimeZones.America/Yakutat": "美洲/雅库塔特",
    "allTimeZones.America/Yellowknife": "美洲/耶洛奈夫",
    "allTimeZones.Antarctica/Casey": "南极洲/凯西",
    "allTimeZones.Antarctica/Davis": "南极洲/戴维斯",
    "allTimeZones.Antarctica/DumontDUrville": "南极洲/杜蒙杜维尔",
    "allTimeZones.Antarctica/Macquarie": "南极洲/麦格理",
    "allTimeZones.Antarctica/Mawson": "南极洲/莫森",
    "allTimeZones.Antarctica/McMurdo": "南极洲/麦克默多",
    "allTimeZones.Antarctica/Palmer": "南极洲/帕尔默",
    "allTimeZones.Antarctica/Rothera": "南极洲/罗瑟拉",
    "allTimeZones.Antarctica/South_Pole": "南极洲/南极",
    "allTimeZones.Antarctica/Syowa": "南极洲/昭和基地",
    "allTimeZones.Antarctica/Troll": "南极洲/特罗尔",
    "allTimeZones.Antarctica/Vostok": "南极洲/沃斯托克",
    "allTimeZones.Arctic/Longyearbyen": "北极/朗伊尔城",
    "allTimeZones.Asia/Aden": "亚洲/亚丁",
    "allTimeZones.Asia/Almaty": "亚洲/阿拉木图",
    "allTimeZones.Asia/Amman": "亚洲/安曼",
    "allTimeZones.Asia/Anadyr": "亚洲/阿纳德尔",
    "allTimeZones.Asia/Aqtau": "亚洲/阿克图",
    "allTimeZones.Asia/Aqtobe": "亚洲/阿克托比",
    "allTimeZones.Asia/Ashgabat": "亚洲/阿什哈巴德",
    "allTimeZones.Asia/Ashkhabad": "亚洲/阿什哈巴德",
    "allTimeZones.Asia/Atyrau": "亚洲/阿特劳",
    "allTimeZones.Asia/Baghdad": "亚洲/巴格达",
    "allTimeZones.Asia/Bahrain": "亚洲/巴林",
    "allTimeZones.Asia/Baku": "亚洲/巴库",
    "allTimeZones.Asia/Bangkok": "亚洲/曼谷",
    "allTimeZones.Asia/Barnaul": "亚洲/巴尔瑙尔",
    "allTimeZones.Asia/Beirut": "亚洲/贝鲁特",
    "allTimeZones.Asia/Bishkek": "亚洲/比什凯克",
    "allTimeZones.Asia/Brunei": "亚洲/文莱",
    "allTimeZones.Asia/Calcutta": "亚洲/加尔各答",
    "allTimeZones.Asia/Chita": "亚洲/赤塔",
    "allTimeZones.Asia/Choibalsan": "亚洲/乔巴山",
    "allTimeZones.Asia/Chongqing": "亚洲/重庆",
    "allTimeZones.Asia/Chungking": "亚洲/重庆",
    "allTimeZones.Asia/Colombo": "亚洲/科伦坡",
    "allTimeZones.Asia/Dacca": "亚洲/达卡",
    "allTimeZones.Asia/Damascus": "亚洲/大马士革",
    "allTimeZones.Asia/Dhaka": "亚洲/达卡",
    "allTimeZones.Asia/Dili": "亚洲/帝力",
    "allTimeZones.Asia/Dubai": "亚洲/迪拜",
    "allTimeZones.Asia/Dushanbe": "亚洲/杜尚别",
    "allTimeZones.Asia/Famagusta": "亚洲/法马古斯塔",
    "allTimeZones.Asia/Gaza": "亚洲/加沙",
    "allTimeZones.Asia/Harbin": "亚洲/哈尔滨",
    "allTimeZones.Asia/Hebron": "亚洲/希伯伦",
    "allTimeZones.Asia/Ho_Chi_Minh": "亚洲/胡志明市",
    "allTimeZones.Asia/Hong_Kong": "亚洲/香港",
    "allTimeZones.Asia/Hovd": "亚洲/科布多",
    "allTimeZones.Asia/Irkutsk": "亚洲/伊尔库茨克",
    "allTimeZones.Asia/Istanbul": "亚洲/伊斯坦布尔",
    "allTimeZones.Asia/Jakarta": "亚洲/雅加达",
    "allTimeZones.Asia/Jayapura": "亚洲/查亚普拉",
    "allTimeZones.Asia/Jerusalem": "亚洲/耶路撒冷",
    "allTimeZones.Asia/Kabul": "亚洲/喀布尔",
    "allTimeZones.Asia/Kamchatka": "亚洲/堪察加半岛",
    "allTimeZones.Asia/Karachi": "亚洲/卡拉奇",
    "allTimeZones.Asia/Kashgar": "亚洲/喀什",
    "allTimeZones.Asia/Kathmandu": "亚洲/加德满都",
    "allTimeZones.Asia/Katmandu": "亚洲/加德满都",
    "allTimeZones.Asia/Khandyga": "亚洲/坎迪加",
    "allTimeZones.Asia/Kolkata": "亚洲/加尔各答",
    "allTimeZones.Asia/Krasnoyarsk": "亚洲/克拉斯诺亚尔斯克",
    "allTimeZones.Asia/Kuala_Lumpur": "亚洲/吉隆坡",
    "allTimeZones.Asia/Kuching": "亚洲/古晋",
    "allTimeZones.Asia/Kuwait": "亚洲/科威特",
    "allTimeZones.Asia/Macao": "亚洲/澳门",
    "allTimeZones.Asia/Macau": "亚洲/澳门",
    "allTimeZones.Asia/Magadan": "亚洲/马加丹",
    "allTimeZones.Asia/Makassar": "亚洲/望加锡",
    "allTimeZones.Asia/Manila": "亚洲/马尼拉",
    "allTimeZones.Asia/Muscat": "亚洲/马斯喀特",
    "allTimeZones.Asia/Nicosia": "亚洲/尼科西亚",
    "allTimeZones.Asia/Novokuznetsk": "亚洲/新库兹涅茨克",
    "allTimeZones.Asia/Novosibirsk": "亚洲/新西伯利亚",
    "allTimeZones.Asia/Omsk": "亚洲/鄂木斯克",
    "allTimeZones.Asia/Oral": "亚洲/乌拉尔",
    "allTimeZones.Asia/Phnom_Penh": "亚洲/金边",
    "allTimeZones.Asia/Pontianak": "亚洲/坤甸",
    "allTimeZones.Asia/Pyongyang": "亚洲/平壤",
    "allTimeZones.Asia/Qatar": "亚洲/卡塔尔",
    "allTimeZones.Asia/Qostanay": "亚洲/库斯塔奈",
    "allTimeZones.Asia/Qyzylorda": "亚洲/克孜洛尔达",
    "allTimeZones.Asia/Rangoon": "亚洲/仰光",
    "allTimeZones.Asia/Riyadh": "亚洲/利雅得",
    "allTimeZones.Asia/Saigon": "亚洲/西贡",
    "allTimeZones.Asia/Sakhalin": "亚洲/萨哈林岛",
    "allTimeZones.Asia/Samarkand": "亚洲/撒马尔罕",
    "allTimeZones.Asia/Seoul": "亚洲/首尔",
    "allTimeZones.Asia/Shanghai": "亚洲/上海",
    "allTimeZones.Asia/Singapore": "亚洲/新加坡",
    "allTimeZones.Asia/Srednekolymsk": "亚洲/中科雷姆斯克",
    "allTimeZones.Asia/Taipei": "亚洲/台北",
    "allTimeZones.Asia/Tashkent": "亚洲/塔什干",
    "allTimeZones.Asia/Tbilisi": "亚洲/第比利斯",
    "allTimeZones.Asia/Tehran": "亚洲/德黑兰",
    "allTimeZones.Asia/Tel_Aviv": "亚洲/特拉维夫",
    "allTimeZones.Asia/Thimbu": "亚洲/廷布",
    "allTimeZones.Asia/Thimphu": "亚洲/廷布",
    "allTimeZones.Asia/Tokyo": "亚洲/东京",
    "allTimeZones.Asia/Tomsk": "亚洲/托木斯克",
    "allTimeZones.Asia/Ujung_Pandang": "亚洲/乌戎潘当",
    "allTimeZones.Asia/Ulaanbaatar": "亚洲/乌兰巴托",
    "allTimeZones.Asia/Ulan_Bator": "亚洲/乌兰巴托",
    "allTimeZones.Asia/Urumqi": "亚洲/乌鲁木齐",
    "allTimeZones.Asia/Ust-Nera": "亚洲/乌斯季涅拉",
    "allTimeZones.Asia/Vientiane": "亚洲/万象",
    "allTimeZones.Asia/Vladivostok": "亚洲/符拉迪沃斯托克",
    "allTimeZones.Asia/Yakutsk": "亚洲/雅库茨克",
    "allTimeZones.Asia/Yangon": "亚洲/仰光",
    "allTimeZones.Asia/Yekaterinburg": "亚洲/叶卡捷琳堡",
    "allTimeZones.Asia/Yerevan": "亚洲/埃里温",
    "allTimeZones.Atlantic/Azores": "大西洋/亚速尔群岛",
    "allTimeZones.Atlantic/Bermuda": "大西洋/百慕大",
    "allTimeZones.Atlantic/Canary": "大西洋/加那利",
    "allTimeZones.Atlantic/Cape_Verde": "大西洋/佛得角",
    "allTimeZones.Atlantic/Faeroe": "大西洋/法罗",
    "allTimeZones.Atlantic/Faroe": "大西洋/法罗群岛",
    "allTimeZones.Atlantic/Jan_Mayen": "大西洋/扬马延岛",
    "allTimeZones.Atlantic/Madeira": "大西洋/马德拉",
    "allTimeZones.Atlantic/Reykjavik": "大西洋/雷克雅未克",
    "allTimeZones.Atlantic/South_Georgia": "大西洋/南乔治亚",
    "allTimeZones.Atlantic/St_Helena": "大西洋/圣赫勒拿",
    "allTimeZones.Atlantic/Stanley": "大西洋/斯坦利",
    "allTimeZones.Australia/ACT": "澳大利亚/澳大利亚首都直辖区",
    "allTimeZones.Australia/Adelaide": "澳大利亚/阿德莱德",
    "allTimeZones.Australia/Brisbane": "澳大利亚/布里斯班",
    "allTimeZones.Australia/Broken_Hill": "澳大利亚/布罗肯希尔",
    "allTimeZones.Australia/Canberra": "澳大利亚/堪培拉",
    "allTimeZones.Australia/Currie": "澳大利亚/柯里",
    "allTimeZones.Australia/Darwin": "澳大利亚/达尔文",
    "allTimeZones.Australia/Eucla": "澳大利亚/尤克拉",
    "allTimeZones.Australia/Hobart": "澳大利亚/霍巴特",
    "allTimeZones.Australia/LHI": "澳大利亚/豪勋爵岛",
    "allTimeZones.Australia/Lindeman": "澳大利亚/林德曼",
    "allTimeZones.Australia/Lord_Howe": "澳大利亚/豪勋爵",
    "allTimeZones.Australia/Melbourne": "澳大利亚/墨尔本",
    "allTimeZones.Australia/NSW": "澳大利亚/新南威尔士州",
    "allTimeZones.Australia/North": "澳大利亚/北部",
    "allTimeZones.Australia/Perth": "澳大利亚/珀斯",
    "allTimeZones.Australia/Queensland": "澳大利亚/昆士兰州",
    "allTimeZones.Australia/South": "澳大利亚/南部",
    "allTimeZones.Australia/Sydney": "澳大利亚/悉尼",
    "allTimeZones.Australia/Tasmania": "澳大利亚/塔斯马尼亚",
    "allTimeZones.Australia/Victoria": "澳大利亚/维多利亚",
    "allTimeZones.Australia/West": "澳大利亚/西部",
    "allTimeZones.Australia/Yancowinna": "澳大利亚/Yancowinna",
    "allTimeZones.Brazil/Acre": "巴西/阿克里",
    "allTimeZones.Brazil/DeNoronha": "巴西/迪诺罗尼亚",
    "allTimeZones.Brazil/East": "巴西/东部",
    "allTimeZones.Brazil/West": "巴西/西部",
    "allTimeZones.CET": "CET",
    "allTimeZones.CST6CDT": "CST6CDT",
    "allTimeZones.Canada/Atlantic": "加拿大/大西洋",
    "allTimeZones.Canada/Central": "加拿大/中部",
    "allTimeZones.Canada/Eastern": "加拿大/东部",
    "allTimeZones.Canada/Mountain": "加拿大/山区",
    "allTimeZones.Canada/Newfoundland": "加拿大/纽芬兰",
    "allTimeZones.Canada/Pacific": "加拿大/太平洋",
    "allTimeZones.Canada/Saskatchewan": "加拿大/萨斯喀彻温省",
    "allTimeZones.Canada/Yukon": "加拿大/育空",
    "allTimeZones.Chile/Continental": "智利/大陆",
    "allTimeZones.Chile/EasterIsland": "智利/复活节岛",
    "allTimeZones.Cuba": "古巴",
    "allTimeZones.EET": "EET",
    "allTimeZones.EST": "EST",
    "allTimeZones.EST5EDT": "EST5EDT",
    "allTimeZones.Egypt": "埃及",
    "allTimeZones.Eire": "爱尔兰",
    "allTimeZones.Etc/GMT": "Etc/GMT",
    "allTimeZones.Etc/GMT+0": "Etc/GMT+0",
    "allTimeZones.Etc/GMT+1": "Etc/GMT+1",
    "allTimeZones.Etc/GMT+10": "Etc/GMT+10",
    "allTimeZones.Etc/GMT+11": "Etc/GMT+11",
    "allTimeZones.Etc/GMT+12": "Etc/GMT+12",
    "allTimeZones.Etc/GMT+2": "Etc/GMT+2",
    "allTimeZones.Etc/GMT+3": "Etc/GMT+3",
    "allTimeZones.Etc/GMT+4": "Etc/GMT+4",
    "allTimeZones.Etc/GMT+5": "Etc/GMT+5",
    "allTimeZones.Etc/GMT+6": "Etc/GMT+6",
    "allTimeZones.Etc/GMT+7": "Etc/GMT+7",
    "allTimeZones.Etc/GMT+8": "Etc/GMT+8",
    "allTimeZones.Etc/GMT+9": "Etc/GMT+9",
    "allTimeZones.Etc/GMT-0": "Etc/GMT-0",
    "allTimeZones.Etc/GMT-1": "Etc/GMT-1",
    "allTimeZones.Etc/GMT-10": "Etc/GMT-10",
    "allTimeZones.Etc/GMT-11": "Etc/GMT-11",
    "allTimeZones.Etc/GMT-12": "Etc/GMT-12",
    "allTimeZones.Etc/GMT-13": "Etc/GMT-13",
    "allTimeZones.Etc/GMT-14": "Etc/GMT-14",
    "allTimeZones.Etc/GMT-2": "Etc/GMT-2",
    "allTimeZones.Etc/GMT-3": "Etc/GMT-3",
    "allTimeZones.Etc/GMT-4": "Etc/GMT-4",
    "allTimeZones.Etc/GMT-5": "Etc/GMT-5",
    "allTimeZones.Etc/GMT-6": "Etc/GMT-6",
    "allTimeZones.Etc/GMT-7": "Etc/GMT-7",
    "allTimeZones.Etc/GMT-8": "Etc/GMT-8",
    "allTimeZones.Etc/GMT-9": "Etc/GMT-9",
    "allTimeZones.Etc/GMT0": "Etc/GMT0",
    "allTimeZones.Etc/Greenwich": "Etc/格林威治",
    "allTimeZones.Etc/UCT": "Etc/UCT",
    "allTimeZones.Etc/UTC": "Etc/UTC",
    "allTimeZones.Etc/Universal": "Etc/世界时",
    "allTimeZones.Etc/Zulu": "Etc/祖鲁",
    "allTimeZones.Europe/Amsterdam": "欧洲/阿姆斯特丹",
    "allTimeZones.Europe/Andorra": "欧洲/安道尔",
    "allTimeZones.Europe/Astrakhan": "欧洲/阿斯特拉罕",
    "allTimeZones.Europe/Athens": "欧洲/雅典",
    "allTimeZones.Europe/Belfast": "欧洲/贝尔法斯特",
    "allTimeZones.Europe/Belgrade": "欧洲/贝尔格莱德",
    "allTimeZones.Europe/Berlin": "欧洲/柏林",
    "allTimeZones.Europe/Bratislava": "欧洲/布拉迪斯拉发",
    "allTimeZones.Europe/Brussels": "欧洲/布鲁塞尔",
    "allTimeZones.Europe/Bucharest": "欧洲/布加勒斯特",
    "allTimeZones.Europe/Budapest": "欧洲/布达佩斯",
    "allTimeZones.Europe/Busingen": "欧洲/布辛根",
    "allTimeZones.Europe/Chisinau": "欧洲/基希讷乌",
    "allTimeZones.Europe/Copenhagen": "欧洲/哥本哈根",
    "allTimeZones.Europe/Dublin": "欧洲/都柏林",
    "allTimeZones.Europe/Gibraltar": "欧洲/直布罗陀",
    "allTimeZones.Europe/Guernsey": "欧洲/根西岛",
    "allTimeZones.Europe/Helsinki": "欧洲/赫尔辛基",
    "allTimeZones.Europe/Isle_of_Man": "欧洲/马恩岛",
    "allTimeZones.Europe/Istanbul": "欧洲/伊斯坦布尔",
    "allTimeZones.Europe/Jersey": "欧洲/泽西岛",
    "allTimeZones.Europe/Kaliningrad": "欧洲/加里宁格勒",
    "allTimeZones.Europe/Kirov": "欧洲/基洛夫",
    "allTimeZones.Europe/Kyiv": "欧洲/基辅",
    "allTimeZones.Europe/Lisbon": "欧洲/里斯本",
    "allTimeZones.Europe/Ljubljana": "欧洲/卢布尔雅那",
    "allTimeZones.Europe/London": "欧洲/伦敦",
    "allTimeZones.Europe/Luxembourg": "欧洲/卢森堡",
    "allTimeZones.Europe/Madrid": "欧洲/马德里",
    "allTimeZones.Europe/Malta": "欧洲/马耳他",
    "allTimeZones.Europe/Mariehamn": "欧洲/玛丽港",
    "allTimeZones.Europe/Minsk": "欧洲/明斯克",
    "allTimeZones.Europe/Monaco": "欧洲/摩纳哥",
    "allTimeZones.Europe/Moscow": "欧洲/莫斯科",
    "allTimeZones.Europe/Nicosia": "欧洲/尼科西亚",
    "allTimeZones.Europe/Oslo": "欧洲/奥斯陆",
    "allTimeZones.Europe/Paris": "欧洲/巴黎",
    "allTimeZones.Europe/Podgorica": "欧洲/波德戈里察",
    "allTimeZones.Europe/Prague": "欧洲/布拉格",
    "allTimeZones.Europe/Riga": "欧洲/里加",
    "allTimeZones.Europe/Rome": "欧洲/罗马",
    "allTimeZones.Europe/Samara": "欧洲/萨马拉",
    "allTimeZones.Europe/San_Marino": "欧洲/圣马力诺",
    "allTimeZones.Europe/Sarajevo": "欧洲/萨拉热窝",
    "allTimeZones.Europe/Saratov": "欧洲/萨拉托夫",
    "allTimeZones.Europe/Simferopol": "欧洲/辛菲罗波尔",
    "allTimeZones.Europe/Skopje": "欧洲/斯科普里",
    "allTimeZones.Europe/Sofia": "欧洲/索非亚",
    "allTimeZones.Europe/Stockholm": "欧洲/斯德哥尔摩",
    "allTimeZones.Europe/Tallinn": "欧洲/塔林",
    "allTimeZones.Europe/Tirane": "欧洲/地拉那",
    "allTimeZones.Europe/Tiraspol": "欧洲/蒂拉斯波尔",
    "allTimeZones.Europe/Ulyanovsk": "欧洲/乌里扬诺夫斯克",
    "allTimeZones.Europe/Uzhgorod": "欧洲/乌日哥罗德",
    "allTimeZones.Europe/Vaduz": "欧洲/瓦杜兹",
    "allTimeZones.Europe/Vatican": "欧洲/梵蒂冈",
    "allTimeZones.Europe/Vienna": "欧洲/维也纳",
    "allTimeZones.Europe/Vilnius": "欧洲/维尔纽斯",
    "allTimeZones.Europe/Volgograd": "欧洲/伏尔加格勒",
    "allTimeZones.Europe/Warsaw": "欧洲/华沙",
    "allTimeZones.Europe/Zagreb": "欧洲/萨格勒布",
    "allTimeZones.Europe/Zaporozhye": "欧洲/扎波罗热",
    "allTimeZones.Europe/Zurich": "欧洲/苏黎世",
    "allTimeZones.GB": "GB",
    "allTimeZones.GB-Eire": "GB-Eire",
    "allTimeZones.GMT": "GMT",
    "allTimeZones.GMT+0": "GMT+0",
    "allTimeZones.GMT-0": "GMT-0",
    "allTimeZones.GMT0": "GMT0",
    "allTimeZones.Greenwich": "格林威治",
    "allTimeZones.HST": "HST",
    "allTimeZones.Hongkong": "中国香港",
    "allTimeZones.Iceland": "冰岛",
    "allTimeZones.Indian/Antananarivo": "印度洋/塔那那利佛",
    "allTimeZones.Indian/Chagos": "印度洋/查戈斯群岛",
    "allTimeZones.Indian/Christmas": "印度洋/圣诞岛",
    "allTimeZones.Indian/Cocos": "印度洋/科科斯",
    "allTimeZones.Indian/Comoro": "印度洋/科摩罗",
    "allTimeZones.Indian/Kerguelen": "印度洋/凯尔盖朗",
    "allTimeZones.Indian/Mahe": "印度洋/马埃岛",
    "allTimeZones.Indian/Maldives": "印度洋/马尔代夫",
    "allTimeZones.Indian/Mauritius": "印度洋/毛里求斯",
    "allTimeZones.Indian/Mayotte": "印度洋/马约特岛",
    "allTimeZones.Indian/Reunion": "印度洋/留尼汪岛",
    "allTimeZones.Iran": "伊朗",
    "allTimeZones.Israel": "以色列",
    "allTimeZones.Jamaica": "牙买加",
    "allTimeZones.Japan": "日本",
    "allTimeZones.Kwajalein": "夸贾林",
    "allTimeZones.Libya": "利比亚",
    "allTimeZones.MET": "MET",
    "allTimeZones.MST": "MST",
    "allTimeZones.MST7MDT": "MST7MDT",
    "allTimeZones.Mexico/BajaNorte": "墨西哥/巴哈诺特",
    "allTimeZones.Mexico/BajaSur": "墨西哥/巴哈苏尔",
    "allTimeZones.Mexico/General": "墨西哥/一般",
    "allTimeZones.NZ": "新西兰",
    "allTimeZones.NZ-CHAT": "NZ-CHAT",
    "allTimeZones.Navajo": "纳瓦霍语",
    "allTimeZones.PRC": "中国",
    "allTimeZones.PST8PDT": "PST8PDT",
    "allTimeZones.Pacific/Apia": "太平洋/阿皮亚",
    "allTimeZones.Pacific/Auckland": "太平洋/奥克兰",
    "allTimeZones.Pacific/Bougainville": "太平洋/布干维尔",
    "allTimeZones.Pacific/Chatham": "太平洋/查塔姆",
    "allTimeZones.Pacific/Chuuk": "太平洋/楚克岛",
    "allTimeZones.Pacific/Easter": "太平洋/复活节岛",
    "allTimeZones.Pacific/Efate": "太平洋/埃法特岛",
    "allTimeZones.Pacific/Enderbury": "太平洋/恩德伯里岛",
    "allTimeZones.Pacific/Fakaofo": "太平洋/法考福",
    "allTimeZones.Pacific/Fiji": "太平洋/斐济",
    "allTimeZones.Pacific/Funafuti": "太平洋/富纳富提",
    "allTimeZones.Pacific/Galapagos": "太平洋/加拉帕戈斯",
    "allTimeZones.Pacific/Gambier": "太平洋/甘比尔",
    "allTimeZones.Pacific/Guadalcanal": "太平洋/瓜达尔卡纳尔岛",
    "allTimeZones.Pacific/Guam": "太平洋/关岛",
    "allTimeZones.Pacific/Honolulu": "太平洋/火奴鲁鲁",
    "allTimeZones.Pacific/Johnston": "太平洋/约翰斯顿",
    "allTimeZones.Pacific/Kiritimati": "太平洋/基里蒂马蒂",
    "allTimeZones.Pacific/Kosrae": "太平洋/科斯雷",
    "allTimeZones.Pacific/Kwajalein": "太平洋/夸贾林岛",
    "allTimeZones.Pacific/Majuro": "太平洋/马朱罗",
    "allTimeZones.Pacific/Marquesas": "太平洋/马克萨斯群岛",
    "allTimeZones.Pacific/Midway": "太平洋/中途岛",
    "allTimeZones.Pacific/Nauru": "太平洋/瑙鲁",
    "allTimeZones.Pacific/Niue": "太平洋/纽埃",
    "allTimeZones.Pacific/Norfolk": "太平洋/诺福克",
    "allTimeZones.Pacific/Noumea": "太平洋/努美阿",
    "allTimeZones.Pacific/Pago_Pago": "太平洋/帕果帕果",
    "allTimeZones.Pacific/Palau": "太平洋/帕劳",
    "allTimeZones.Pacific/Pitcairn": "太平洋/皮特凯恩",
    "allTimeZones.Pacific/Pohnpei": "太平洋/波纳佩岛",
    "allTimeZones.Pacific/Ponape": "太平洋/波纳佩岛",
    "allTimeZones.Pacific/Port_Moresby": "太平洋/莫尔兹比港",
    "allTimeZones.Pacific/Rarotonga": "太平洋/拉罗汤加",
    "allTimeZones.Pacific/Saipan": "太平洋/塞班岛",
    "allTimeZones.Pacific/Samoa": "太平洋/萨摩亚",
    "allTimeZones.Pacific/Tahiti": "太平洋/塔希提岛",
    "allTimeZones.Pacific/Tarawa": "太平洋/塔拉瓦",
    "allTimeZones.Pacific/Tongatapu": "太平洋/汤加塔布岛",
    "allTimeZones.Pacific/Truk": "太平洋/特鲁克",
    "allTimeZones.Pacific/Wake": "太平洋/威克",
    "allTimeZones.Pacific/Wallis": "太平洋/瓦利斯",
    "allTimeZones.Pacific/Yap": "太平洋/雅浦",
    "allTimeZones.Poland": "波兰",
    "allTimeZones.Portugal": "葡萄牙",
    "allTimeZones.ROC": "ROC",
    "allTimeZones.ROK": "韩国",
    "allTimeZones.Singapore": "新加坡",
    "allTimeZones.Turkey": "土耳其",
    "allTimeZones.UCT": "UCT",
    "allTimeZones.US/Alaska": "美国/阿拉斯加",
    "allTimeZones.US/Aleutian": "美国/阿留申",
    "allTimeZones.US/Arizona": "美国/亚利桑那州",
    "allTimeZones.US/Central": "美国/中部",
    "allTimeZones.US/East-Indiana": "美国/东印第安纳州",
    "allTimeZones.US/Eastern": "美国/东部",
    "allTimeZones.US/Hawaii": "美国/夏威夷",
    "allTimeZones.US/Indiana-Starke": "美国/印第安纳-斯塔克",
    "allTimeZones.US/Michigan": "美国/密歇根州",
    "allTimeZones.US/Mountain": "美国/山地",
    "allTimeZones.US/Pacific": "美国/太平洋",
    "allTimeZones.US/Pacific-New": "美国/太平洋-新",
    "allTimeZones.US/Samoa": "美国/萨摩亚",
    "allTimeZones.UTC": "UTC",
    "allTimeZones.Universal": "世界时",
    "allTimeZones.W-SU": "W-SU",
    "allTimeZones.WET": "WET",
    "allTimeZones.Zulu": "祖鲁",
    "app.emptyState.customize": "自定义 {appName}",
    "appConfigToggledFeaturesSection.caption": "{num} 项功能 {on}",
    "appConfigToggledFeaturesSection.tooltip.instructions":
      "点击以展开并编辑选项",
    "appConfigToggledFeaturesSection.tooltip.turnedOnFeature":
      "{featureNames} 已开启",
    "appContainer.header.addDatabase": "添加数据库",
    "appContainer.header.collections.editButton.done": "已完成",
    "appContainer.header.collections.editButton.edit": "编辑",
    "appContainer.header.collections.title": "{appName} 中的数据库",
    "appContainer.header.customize": "编辑 {databaseName} 设置",
    "appTemplates.createdTimePropertyTitle": "创建时间",
    "appTemplates.docs.createdByProperty": "创建者",
    "appTemplates.docs.createdTimePropertyTitle": "创建时间",
    "appTemplates.docs.docTypeFeature": "文档类型",
    "appTemplates.docs.docTypeFeatureDescription":
      "文档类型：文档、产品规格、工程设计文档、营销简报等。",
    "appTemplates.docs.docsCollectionEmptyButtonTitle": "新建文档",
    "appTemplates.docs.docsCollectionEmptyDescription":
      "文档可帮助你的团队组织和协作处理团队文档。",
    "appTemplates.docs.docsCollectionEmptyTitle": "无文档",
    "appTemplates.docs.docsCollectionName": "文档",
    "appTemplates.docs.docsCreatedTimeProperty": "创建时间",
    "appTemplates.docs.docsListViewName": "列表",
    "appTemplates.docs.docsTableViewName": "所有文档",
    "appTemplates.docs.docsWelcomeSubtitle":
      "简单文档模板，具有单个文档数据库。",
    "appTemplates.docs.docsWelcomeTitle": "欢迎使用文档",
    "appTemplates.docs.gettingStartedWithDocs": "文档入门指南",
    "appTemplates.docs.lastEditedByProperty": "上次编辑者",
    "appTemplates.docs.lastEditedTimeProperty": "上次编辑时间",
    "appTemplates.docs.myDocsFeatureDescription": "我创建的文档列表视图。",
    "appTemplates.docs.myDocsListViewName": "我的文档",
    "appTemplates.docs.paragraph1": "👋 欢迎使用文档！",
    "appTemplates.docs.paragraph2":
      "使用此模板组织文档，如技术规范、架构概述和项目启动记录。",
    "appTemplates.docs.preview1Description": "关于此模板预览图片的一些描述...",
    "appTemplates.docs.preview2Description": "关于此模板预览视频的一些描述...",
    "appTemplates.docs.recentlyEditedFeatureDescription":
      "按上次编辑时间排序的文档列表视图。",
    "appTemplates.docs.recentlyEditedViewName": "最近编辑",
    "appTemplates.docs.simpleDocsFeatureDescription":
      "具有创建时间、创建者、上次创建时间、上次创建者的属性的文档数据库。",
    "appTemplates.docs.simpleDocsPresetDescription": "简单的文档。 PRD、RFC 等",
    "appTemplates.docs.simpleDocsPresetName": "文档",
    "appTemplates.docs.simpleDocsPresetShortName": "文档",
    "appTemplates.docs.statusDone": "完成",
    "appTemplates.docs.statusFeatureDescription":
      "草稿、新建、审核中、已批准、已存档。",
    "appTemplates.docs.statusInProgress": "进行中",
    "appTemplates.docs.statusProperty": "状态",
    "appTemplates.docs.statusToDo": "待办事项",
    "appTemplates.docs.tagProperty": "标签",
    "appTemplates.meetings.brainstorm": "集体讨论",
    "appTemplates.meetings.byTypeViewFeature": "按类型分类的会议",
    "appTemplates.meetings.byTypeViewFeatureDescription":
      "按会议类型分类的会议视图。",
    "appTemplates.meetings.byTypeViewName": "按类型",
    "appTemplates.meetings.calendarViewFeature": "日历视图",
    "appTemplates.meetings.calendarViewFeatureDescription":
      "在日历视图中显示会议。",
    "appTemplates.meetings.createdByAndTimeFeature": "创建者/时间",
    "appTemplates.meetings.createdByAndTimeFeatureDescription":
      "创建会议记录的时间和人员。",
    "appTemplates.meetings.createdByProperty": "创建者",
    "appTemplates.meetings.createdTimePropertyTitle": "创建时间",
    "appTemplates.meetings.gettingStartedWith1on1s": "1:1 会议入门指南",
    "appTemplates.meetings.gettingStartedWithDocs": "文档入门指南",
    "appTemplates.meetings.gettingStartedWithMeetings": "会议入门指南",
    "appTemplates.meetings.lastEditedByAndTimeFeature": "上次编辑时间和编辑者",
    "appTemplates.meetings.lastEditedByAndTimeFeatureDescription":
      "上次编辑会议记录的时间和人员",
    "appTemplates.meetings.lastEditedByProperty": "上次编辑者",
    "appTemplates.meetings.lastEditedTimeProperty": "上次编辑时间",
    "appTemplates.meetings.meetingAttendeesProperty": "与会者",
    "appTemplates.meetings.meetingTimeProperty": "会议时间",
    "appTemplates.meetings.meetingTypeFeatureDescription":
      "会议类型：晨会、集体讨论、团队周会等",
    "appTemplates.meetings.meetingTypeProperty": "会议类型",
    "appTemplates.meetings.meetingsAndNotesPresetDescription":
      "从同步的日历事件中记录会议笔记。与 Notion 的日历应用程序 Corn 配合使用,效果很好。",
    "appTemplates.meetings.meetingsAndNotesPresetName": "会议",
    "appTemplates.meetings.meetingsAndNotesPresetShortName": "会议",
    "appTemplates.meetings.meetingsCollectionName": "会议",
    "appTemplates.meetings.meetingsParticipantProperty": "参与者",
    "appTemplates.meetings.meetingsWelcomeSubtitle":
      "追踪你的会议和笔记：与会者、议程、待办事项等。",
    "appTemplates.meetings.meetingsWelcomeTitle": "欢迎加入会议",
    "appTemplates.meetings.myMeetingViewFeatureDescription":
      "我创建或参加的所有会议的视图。",
    "appTemplates.meetings.myMeetingViewName": "我的会议",
    "appTemplates.meetings.notesCollectionName": "会议记录",
    "appTemplates.meetings.oneOnOnePresetDescription":
      "简单的 1:1 模板，带有单个数据库。",
    "appTemplates.meetings.oneOnOnePresetName": "1:1 会议",
    "appTemplates.meetings.oneOnOnePresetShortName": "1:1",
    "appTemplates.meetings.oneOnOneparagraph1": "👋 欢迎加入 1:1 会议！",
    "appTemplates.meetings.oneOnOneparagraph2":
      "使用此模板组织和记录 1:1 会议的纪要",
    "appTemplates.meetings.oneOnOneparagraph3":
      "要开始使用，请与队友分享此模板，并使用它为即将到来的 1:1 会议做记录！",
    "appTemplates.meetings.paragraph1": "👋 欢迎加入会议！",
    "appTemplates.meetings.paragraph2":
      "使用此模板组织会议、分享议程和记录会议纪要。",
    "appTemplates.meetings.preview1Description":
      "关于此模板预览图片的一些描述...",
    "appTemplates.meetings.preview2Description":
      "关于此模板预览视频的一些描述...",
    "appTemplates.meetings.standup": "晨会",
    "appTemplates.meetings.tagProperty": "标签",
    "appTemplates.meetings.teamWeekly": "团队周会",
    "appTemplates.meetingsParticipantProperty": "参与者",
    "appTemplates.mettings.notesCollectionEmptyButtonTitle": "新建会议",
    "appTemplates.mettings.notesCollectionEmptyDescription":
      "会议可帮助你的团队组织会议、共享议程，以及记录会议记录。",
    "appTemplates.mettings.notesCollectionEmptyTitle": "没有会议",
    "appTemplates.namePropertyTitle": "名称",
    "appTemplates.notes.notesCreatedTimeProperty": "创建时间",
    "appTemplates.projects.advancedTaskFeatureDescription": "任务的看板视图。",
    "appTemplates.projects.advancedTaskProjectStatus.description":
      "任务和项目：未启动、进行中、已暂停、已完成、已取消",
    "appTemplates.projects.advancedTaskProjectStatus.name":
      "未开始、进行中、完成、已归档",
    "appTemplates.projects.agilePresetName": "项目、任务、迭代（敏捷）",
    "appTemplates.projects.agilePresetShortName": "项目和任务",
    "appTemplates.projects.allTasksViewName": "全部",
    "appTemplates.projects.assignProperty": "分配",
    "appTemplates.projects.boardViewName": "看板",
    "appTemplates.projects.bug": "Bug",
    "appTemplates.projects.cancelled": "已取消",
    "appTemplates.projects.completed": "完成",
    "appTemplates.projects.description": "描述",
    "appTemplates.projects.doing": "处理中",
    "appTemplates.projects.done": "已完成",
    "appTemplates.projects.dueDateProperty": "截止日期",
    "appTemplates.projects.endDateProperty": "结束日期",
    "appTemplates.projects.estimateProperty": "估计",
    "appTemplates.projects.estimatesFeatureDescription":
      "使用常用的方法和自定义选项来调整你的任务大小。",
    "appTemplates.projects.feature": "功能",
    "appTemplates.projects.gettingStartedWithProjects": "项目入门指南",
    "appTemplates.projects.hmlPriority": "高、中、低",
    "appTemplates.projects.inProgress": "进行中",
    "appTemplates.projects.isCurrentSprintProperty": "是当前迭代",
    "appTemplates.projects.isCurrentSprintRollup": "是当前迭代",
    "appTemplates.projects.markAsDuplicate": "标记为重复",
    "appTemplates.projects.markAsDuplicateFeatureDescription":
      "将任务标记为另一个任务的副本。",
    "appTemplates.projects.notStarted": "未启动",
    "appTemplates.projects.parentTasksName": "父任务",
    "appTemplates.projects.paused": "已暂停",
    "appTemplates.projects.pointsEstimates": "要点",
    "appTemplates.projects.priorityFeatureDescription":
      "标记首先要完成的任务或项目。",
    "appTemplates.projects.priorityHigh": "高",
    "appTemplates.projects.priorityLow": "低",
    "appTemplates.projects.priorityMedium": "中",
    "appTemplates.projects.priorityProperty": "优先级",
    "appTemplates.projects.projectLeads": "主管",
    "appTemplates.projects.projectMembers": "成员",
    "appTemplates.projects.projectOwners": "所有者",
    "appTemplates.projects.projectPeople": "人员",
    "appTemplates.projects.projectTimelineFeature": "产品路线图",
    "appTemplates.projects.projectTimelineFeatureDescription":
      "让你的团队与高级项目产品路线图保持同步。",
    "appTemplates.projects.projectsAndTasksAppName": "项目",
    "appTemplates.projects.projectsAndTasksPresetName": "项目和任务（看板）",
    "appTemplates.projects.projectsAndTasksPresetShortName": "项目和任务",
    "appTemplates.projects.projectsBoardViewName": "项目",
    "appTemplates.projects.projectsCollectionEmptyButtonTitle": "新建项目",
    "appTemplates.projects.projectsCollectionEmptyDescription":
      "项目可帮助你的团队组织任务并把握全局。",
    "appTemplates.projects.projectsCollectionEmptyTitle": "没有项目",
    "appTemplates.projects.projectsCollectionName": "项目",
    "appTemplates.projects.projectsFeatureDescription":
      "适合复杂工作（可以是任务的集合）的数据库。",
    "appTemplates.projects.projectsLeadsAndMembers": "项目主管和成员",
    "appTemplates.projects.projectsOwnersAndMembers": "项目的所有者和成员",
    "appTemplates.projects.projectsTableViewName": "所有项目",
    "appTemplates.projects.projectsViewName": "项目",
    "appTemplates.projects.simpleTaskFeatureDescription":
      "适合精细工作的数据库，例如问题、任务或 bug。",
    "appTemplates.projects.simpleTaskProjectStatus.description":
      "任务：待办事项，处理中，已完成；项目：未开始、进行中、已暂停、已完成、已取消",
    "appTemplates.projects.simpleTaskProjectStatus.name": "待办事项、完成",
    "appTemplates.projects.simpleTasksPresetName": "待办事项",
    "appTemplates.projects.simpleTasksPresetShortName": "任务",
    "appTemplates.projects.sprintsCollectionEmptyButtonTitle": "新建迭代",
    "appTemplates.projects.sprintsCollectionEmptyDescription":
      "冲刺定义了你可以将任务和项目组织到其中的时间段。",
    "appTemplates.projects.sprintsCollectionEmptyTitle": "没有迭代",
    "appTemplates.projects.sprintsCollectionName": "迭代",
    "appTemplates.projects.sprintsName": "迭代",
    "appTemplates.projects.startDateProperty": "开始日期",
    "appTemplates.projects.status": "状态",
    "appTemplates.projects.statusDone": "完成",
    "appTemplates.projects.statusFeatureDescription": "跟踪任务/项目的状态。",
    "appTemplates.projects.statusInProgress": "进行中",
    "appTemplates.projects.statusProperty": "状态",
    "appTemplates.projects.statusToDo": "待办事项",
    "appTemplates.projects.subTaskFeatureDescription":
      "将任务分解为更小的子任务并跟踪进度。",
    "appTemplates.projects.subTasksName": "子任务",
    "appTemplates.projects.tableViewName": "表格",
    "appTemplates.projects.tags": "标签",
    "appTemplates.projects.taskBlockedByName": "阻止者",
    "appTemplates.projects.taskBlockingName": "正在阻止",
    "appTemplates.projects.taskDependenciesFeatureDescription":
      "将一个任务标记为被另一个任务阻止。",
    "appTemplates.projects.taskDependenciesName": "依赖性",
    "appTemplates.projects.taskDueDateFeature": "任务截止日期",
    "appTemplates.projects.taskDueDateFeatureDescription":
      "为任务添加截止日期。",
    "appTemplates.projects.taskDuplicatesName": "重复项",
    "appTemplates.projects.taskIsDuplicateOfName": "与...重复",
    "appTemplates.projects.taskProjectRelationName": "项目",
    "appTemplates.projects.taskRelatedName": "相关",
    "appTemplates.projects.taskReporter": "报告者",
    "appTemplates.projects.taskType": "任务类型",
    "appTemplates.projects.taskTypeFeatureDescription":
      "使用模板创建不同类型的任务。",
    "appTemplates.projects.tasksBoardFeatureName": "任务看板",
    "appTemplates.projects.tasksBoardViewName": "任务看板",
    "appTemplates.projects.tasksCollectionEmptyButtonTitle": "新任务",
    "appTemplates.projects.tasksCollectionEmptyDescription":
      "任务追踪细化且单一的工作。",
    "appTemplates.projects.tasksCollectionEmptyTitle": "没有任务",
    "appTemplates.projects.tasksCollectionName": "任务",
    "appTemplates.projects.tasksCurrentSprintViewName": "此迭代",
    "appTemplates.projects.tasksViewName": "所有任务",
    "appTemplates.projects.tasksWithSprintsFeatureDescription":
      "每隔几周让你的团队专注于一组任务。",
    "appTemplates.projects.timelineProperty": "日期",
    "appTemplates.projects.todo": "待办事项",
    "appTemplates.projects.tshirtSizeEstimates": "T 恤尺码",
    "appTemplates.projects.welcomeSubtitle":
      "创建一个项目管理系统来跟踪个人或团队项目。先从下面选择一个模板，然后轻松地对其进行定制以满足你的需求。",
    "appTemplates.projects.welcomeTitle": "管理项目和任务",
    "appTemplates.sprints.datesProperty": "日期",
    "appTemplates.sprints.sprint1": "迭代 1",
    "appTemplates.sprints.sprint2": "迭代 2",
    "appTemplates.sprints.sprint3": "迭代 3",
    "appTemplates.tasks.activeProjectsGalleryFeature": "活动项目画廊",
    "appTemplates.tasks.activeProjectsGalleryFeatureDescription":
      "进行中项目的画廊视图。",
    "appTemplates.tasks.activeProjectsView": "活动项目",
    "appTemplates.tasks.agilePresetDescription":
      "专为软件开发团队设计的系统。通过冲刺、项目估算等组织项目。",
    "appTemplates.tasks.assignProperty": "分配",
    "appTemplates.tasks.createATask": "创建任务",
    "appTemplates.tasks.createNotionWorkspace": "创建 Notion 工作区",
    "appTemplates.tasks.defineASprint": "定义迭代",
    "appTemplates.tasks.docsTitleProperty": "标题",
    "appTemplates.tasks.downloadProjectTemplate": "下载项目模板",
    "appTemplates.tasks.downloadTaskTemplate": "下载任务模板",
    "appTemplates.tasks.inviteTeamMembers": "邀请团队成员",
    "appTemplates.tasks.meetingNotesTitleProperty": "名称",
    "appTemplates.tasks.myTasks": "我的任务",
    "appTemplates.tasks.myTasksFeatureDescription":
      "分配给我的任务的表格视图。",
    "appTemplates.tasks.notesViewName": "笔记",
    "appTemplates.tasks.preview1Description": "关于此模板预览图片的一些描述...",
    "appTemplates.tasks.preview2Description":
      "将项目分解为任务，将工作从高级计划组织到单个任务。",
    "appTemplates.tasks.projectCalendarFeature": "日历",
    "appTemplates.tasks.projectCalendarFeatureDescription":
      "项目时间表的日历视图。",
    "appTemplates.tasks.projectTitleProperty": "项目名称",
    "appTemplates.tasks.projectsAndTasksPresetDescription":
      "专为小型团队设计的系统。按项目组织任务，与你的团队协调，并跟踪进度。",
    "appTemplates.tasks.projectsBoardFeature": "项目看板",
    "appTemplates.tasks.projectsBoardFeatureDescription": "项目的看板视图",
    "appTemplates.tasks.projectsTimelineView": "时间轴",
    "appTemplates.tasks.simpleTasksPresetDescription":
      "简单任务管理，专为单个用户而设计。可在一个视图中跟踪所有任务的状态。",
    "appTemplates.tasks.sprintTitleProperty": "迭代名称",
    "appTemplates.tasks.statusDone": "完成",
    "appTemplates.tasks.statusInProgress": "进行中",
    "appTemplates.tasks.statusProperty": "状态",
    "appTemplates.tasks.statusToDo": "待办",
    "appTemplates.tasks.taskByDueDateFeature": "任务表格",
    "appTemplates.tasks.taskByDueDateFeatureDescription":
      "按到期日期的不同窗口分组的任务表格视图。",
    "appTemplates.tasks.taskByPersonFeatureDescription":
      "按代理人分组的任务看板视图。",
    "appTemplates.tasks.taskByPersonFeatureName": "按人员显示任务",
    "appTemplates.tasks.taskByPersonViewName": "人员",
    "appTemplates.tasks.taskByProjectFeatureDescription":
      "按项目分组的任务的看板视图。",
    "appTemplates.tasks.taskByProjectFeatureName": "特定于项目的任务",
    "appTemplates.tasks.taskByProjectViewName": "按项目显示任务",
    "appTemplates.tasks.taskTitleProperty": "任务名称",
    "appTemplates.tasks.tasksBoardFeatureDescription": "可视化看板上的工作。",
    "appTemplates.wiki.companyHomeWikiDescription":
      "一个将公司信息集中在一起的地方，例如公司政策和重要公告。",
    "appTemplates.wiki.engineeringWikiDescription":
      "一个为工程团队建立的知识库，包括工程流程和设置指南。",
    "appTemplates.wiki.lifeWikiDescription":
      "“我们做得越好，我们就会越快变得更好。” ── Douglas Engelbart",
    "appTemplates.wiki.personalHomeWikiDescription":
      "将你生活中的所有信息都组织起来。",
    "appTemplates.wiki.preview1Description": "关于此模板预览图片的一些描述...",
    "appTemplates.wiki.preview2Description": "关于此模板预览视频的一些描述...",
    "appTemplates.wiki.productWikiDescription":
      "一个为产品团队建立的知识库，包括启动过程和团队OKR。",
    "appTemplates.wiki.salesWikiDescription":
      "一个为销售团队建立的知识库，包括推销材料和销售流程。",
    "appTemplates.wiki.simpleWikiPresetName": "简单知识库",
    "appTemplates.wiki.teamHomeWikiDescription":
      "为团队中的每个人提供重要信息、资源、公告等信息的真实来源。",
    "appTemplates.wiki.wikiAppName": "知识库",
    "appTemplates.wiki.wikiWelcomeSubtitle":
      "从头开始使用模板。你稍后可以从模板画廊中添加更多知识库。",
    "appTemplates.wiki.wikiWelcomeTitle": "创建团队知识库",
    "appUpdateListener.mobileAppNotSupported.android": "安卓",
    "appUpdateListener.mobileAppNotSupported.ios": "iOS",
    "appUpdateListener.mobileAppNotSupported.message":
      "不再支持此应用程序版本。{br}请<upgradelink>升级你的 {androidOrIOSApp} 应用</upgradelink>。",
    "appUpdateListener.mobilePlatformNotSupported.message":
      "不再支持此操作系统。{br}请<upgradelink>升级到{supportedPlatformVersion}或更高版本。</upgradelink>",
    "appUpdateListener.reinstallDesktopApp.message":
      "<textlink>下载并重新安装</textlink>你的桌面应用以获取最新功能。",
    "appVersionMenuItem.desktopVersion.menuItem":
      "桌面版 {desktopVersionFormatted}",
    "appVersionMenuItem.downloadingUpdate.message":
      "正在下载{version} {percentComplete}",
    "appVersionMenuItem.lastUpdatedReactNativeVersion.menuItem":
      "移动端 {reactNativeVersionFormatted}",
    "appVersionMenuItem.lastUpdatedTime.menuItem": "更新于 {lastUpdatedTime}",
    "appVersionMenuItem.mobile.clearCache.message": "清除缓存",
    "appVersionMenuItem.noUpdatesForApp.message": "无更新 {timeFromNow}",
    "appVersionMenuItem.updateReady.message": "更新就绪 {version}",
    "appVersionMenuItem.updateStateForApp.checking.message": "正在检查更新…",
    "appVersionMenuItem.waitingForAppJsUpdate.message": "App.js - 等待中…",
    "appVersionMenuitem.updateError.message": "更新错误 {errorMessage}",
    "appearanceSetting.dark.label": "深色",
    "appearanceSetting.light.label": "浅色",
    "appearanceSetting.system.label": "使用系统设置",
    "appearanceSettings.description.message": "自定义 Notion 在设备上的外观。",
    "appearanceSettings.modal.done": "完成",
    "appearanceSettings.title": "外观",
    "appleErrors.api.missingAccessTokenError": "Apple 无法授权登录。",
    "appleErrors.api.missingBetaAppReviewSubmission":
      "找不到 betaAppReviewSubmission 条目。",
    "appleErrors.api.missingIdError": "在从 Apple 获取用户信息时出现问题。",
    "appleErrors.api.missingPreReleaseVersion":
      "找不到 preReleaseVersion 条目。",
    "appleErrors.api.statusError": "Apple 服务出现问题。",
    "appleErrors.api.tokenError": "在与 Apple 验证你的身份时出现问题。",
    "applyCreditToggle.applyCredit.amount": "使用 {creditAmount} 积分",
    "apps.AppInitializationOverlay.startButton": "立即开始",
    "apps.AppInitializationOverlay.welcomeTitle.default": "欢迎使用 {appName}",
    "apps.emptyAppOverlay.actionButton.label": "添加新 {entity}",
    "apps.emptyAppOverlay.emptyMessage.label": "无 {entity}",
    "apps.workspacesetup.button.continueWithChosenApps":
      "继续使用 {num} 个模板",
    "apps.workspacesetup.button.continueWithoutChoosingApps":
      "我将稍后添加模板",
    "apps.workspacesetup.header.description":
      "从 {workspace} 中每个人可以共同使用的模板开始。",
    "apps.workspacesetup.header.title": "让您的团队开始使用 Notion",
    "asanaActions.authenticatingWithAsana.loadingMessage": "Asana 授权中…",
    "asanaActions.loginWithAsanaPopupModal.title": "Asana 登录",
    "asanaImportOption.actionsMenu.connectAnotherAccount": "绑定另一个帐户",
    "asanaImportOption.actionsMenu.import": "导入",
    "asanaImportOption.actionsMenu.removeIntegration": "移除",
    "asanaImportOption.search.noResultsPlaceholder": "沒有项目",
    "asanaImportOption.search.placeholder": "搜索项目…",
    "attributionSetting.description.message":
      "在队友创建或编辑的块左侧查看队友的姓名首字母缩写。",
    "attributionSetting.title": "块归属",
    "attributionTooltip.createdByTitle": "创建者",
    "attributionTooltip.lastEditedByTitle": "上次编辑者",
    "attributionTooltip.moreTitle": "另外 {total} 个",
    "attributionTooltip.pageInTitle": "页面",
    "attributionTooltip.sharedFromTitle": "共享自",
    "attributionTooltip.sharedWithTitle": "共享对象",
    "audioBlock.embed.caption": "适用于 .mp3、.wav 和 .ogg 等格式",
    "audioBlock.embedAudio.button.label": "嵌入音频",
    "audioBlock.placeholder": "添加音频文件",
    "auditLog.actionNames.eventColumn.login": "已登录",
    "auditLog.actionNames.eventColumn.loginWithCity":
      "已登录 {platform} {city}",
    "auditLog.actionNames.eventColumn.loginWithCityAndCountry":
      "已登录 {platform} {city}，{countryCode}",
    "auditLog.actionNames.eventColumn.loginWithCityStateAndCountry":
      "已在 {geolocation} 通过 {platform} 登录",
    "auditLog.actionNames.eventColumn.loginWithMetadata":
      "已在 {city} 登录 {platform}",
    "auditLog.actionNames.eventColumn.loginWithPlatform":
      "已通过 {platform} 登录",
    "auditLog.actionNames.eventColumn.loginWithPlatformOnly":
      "已登录 {platform}",
    "auditLog.dateTimeRangeMenu.endingDatePlaceholder": "结束",
    "auditLog.dateTimeRangeMenu.startingDatePlaceholder": "开始",
    "auditLog.dateTimeRangeMenu.timePlaceholderInNumber": "凌晨 12:00",
    "auditLogCSV.menu.30days": "过去 30 天",
    "auditLogCSV.menu.365days": "过去 1 年",
    "auditLogCSV.menu.365days.prompt":
      "你确定要导出一年的 CSV 吗？在后台进行处理时，不能重复此操作。",
    "auditLogCSV.menu.60days": "过去 60 天",
    "auditLogCSV.menu.90days": "过去 90 天",
    "auditLogCSV.menu.export": "导出",
    "auditLogCSV.popup.tooltip": "点击以 CSV 格式导出审计日志的选项",
    "auditLogColumnEvent.tooltip.audienceMessage": "页面观众：{audience}",
    "auditLogColumnEvent.tooltip.pageAudience.private": "私人",
    "auditLogColumnEvent.tooltip.pageAudience.sharedExternally": "已外部分享",
    "auditLogColumnEvent.tooltip.pageAudience.sharedInternally": "已内部分享",
    "auditLogColumnEvent.tooltip.pageAudience.sharedToWeb": "已分享到网络",
    "auditLogEntry.changes.workspaceCreation.afterSetting":
      "到 {afterWorkspaceCreationSetting}",
    "auditLogEntry.changes.workspaceCreation.beforeSetting":
      "从 {prevWorkspaceCreationSetting}",
    "auditLogPaginatedTable.copiedText.noEmail": "不适用",
    "auditLogPaginatedTable.copiedText.noRole": "不适用",
    "auditLogPaginatedTable.copiedText.notionAdmin": "notion_admin",
    "auditLogPaginatedTable.copyButton.actionName": "actionName",
    "auditLogPaginatedTable.copyButton.emailPlaceholder": "邮箱地址",
    "auditLogPaginatedTable.copyButton.geolocationPlaceholder": "地理位置",
    "auditLogPaginatedTable.copyButton.ipPlaceholder": "IP",
    "auditLogPaginatedTable.copyButton.platformPlaceholder": "平台",
    "auditLogPaginatedTable.copyButton.rolePlaceholder": "角色",
    "auditLogSettings.copiedText.missingField": "缺少",
    "auditLogSettings.copiedText.notApplicable": "不适用",
    "auditLogSettings.metadata.cityAndCountry": "{city}，{countryCode}",
    "auditLogSettings.metadata.cityStateAndCountry":
      "{city}，{state}，{countryCode}",
    "auditLogSettings.metadata.ipAddress": "IP 地址：{ip}",
    "auditLogSettings.timeTooltip.localTIme": "当地时区：{timezone}",
    "auditLogSettings.timeTooltip.utcTime": "UTC：{time}",
    "auditLogSpaceRoleMessages.admin": "管理员",
    "auditLogSpaceRoleMessages.guest": "访客",
    "auditLogSpaceRoleMessages.member": "成员",
    "auditLogSpaceRoleMessages.membershipAdmin": "成员资格管理员",
    "auditLogSpaceRoleMessages.noAccess": "无访问权限",
    "auditLogSpaceRoleMessages.workspaceOwner": "工作区所有者",
    "auditlog.actionNames.allowed_support_access":
      "授予 {name} 的支持访问权限，直到 {date}",
    "auditlog.actionNames.automatic_account_creation_disabled":
      "已禁用在登录时自动创建帐户",
    "auditlog.actionNames.automatic_account_creation_enabled":
      "已启用在登录时自动创建帐户",
    "auditlog.actionNames.eventColumn.a_file": "文件",
    "auditlog.actionNames.eventColumn.a_file_with_extension":
      "{extension} 文件",
    "auditlog.actionNames.eventColumn.allowed_email_domain_added":
      "已将“{addedValue}”添加到允许的电子邮件域名中",
    "auditlog.actionNames.eventColumn.allowed_email_domain_removed":
      "已将“{removedValue}”从允许的电子邮件域名中删除",
    "auditlog.actionNames.eventColumn.disable_guests_toggled": "访客",
    "auditlog.actionNames.eventColumn.email_changed":
      "已将电子邮件从 {oldEmail} 更改为 {newEmail}",
    "auditlog.actionNames.eventColumn.export_toggled": "导出",
    "auditlog.actionNames.eventColumn.file_downloaded":
      "已从 {pageName} 下载 {fileName}",
    "auditlog.actionNames.eventColumn.file_uploaded": "已上传文件",
    "auditlog.actionNames.eventColumn.file_uploaded_public":
      "已将文件上传到 {pageName}",
    "auditlog.actionNames.eventColumn.for_private_team": "针对私人团队空间",
    "auditlog.actionNames.eventColumn.for_team_name": "针对 {teamName}",
    "auditlog.actionNames.eventColumn.from_old_team_name_to_new_team_name":
      "从“{oldTeamName}”更改为“{newTeamName}”",
    "auditlog.actionNames.eventColumn.from_unknown_team_name_to_new_team_name":
      "从某个团队空间名称更改为“{newTeamName}”",
    "auditlog.actionNames.eventColumn.group": "群组",
    "auditlog.actionNames.eventColumn.group_added_to_team":
      "已邀请 {groupName} 作为团队空间成员加入 {teamName}",
    "auditlog.actionNames.eventColumn.group_removed_from_team":
      "已将 {groupName} 从 {teamName} 中移除",
    "auditlog.actionNames.eventColumn.guest_removed":
      "已将访客 {guestNameAndEmail} 从工作区中移除",
    "auditlog.actionNames.eventColumn.idp_metadata_url_set":
      "将 IDP 元数据 URL 设置为“{newValue}”",
    "auditlog.actionNames.eventColumn.idp_metadata_url_updated":
      "已将 IDP 元数据 URL 从“{oldValue}”更改为“{newValue}”",
    "auditlog.actionNames.eventColumn.idp_metadata_xml_removed":
      "已删除 IDP 元数据 XML",
    "auditlog.actionNames.eventColumn.idp_metadata_xml_updated":
      "已更新 IDP 元数据 XML",
    "auditlog.actionNames.eventColumn.inviteLink.disabled": "已禁用邀请链接",
    "auditlog.actionNames.eventColumn.inviteLink.enabled": "已启用邀请链接",
    "auditlog.actionNames.eventColumn.invite_link_disabled": "已禁用邀请链接",
    "auditlog.actionNames.eventColumn.invite_link_enabled": "已启用邀请链接",
    "auditlog.actionNames.eventColumn.invite_link_reset": "重置邀请链接",
    "auditlog.actionNames.eventColumn.logged_in_geolocation":
      "位于 {geolocation}",
    "auditlog.actionNames.eventColumn.logged_in_platform": "在 {platform} 上",
    "auditlog.actionNames.eventColumn.logout": "已登出",
    "auditlog.actionNames.eventColumn.member_added_to_team":
      "已邀请 {memberNameAndEmail} 作为 {teamRole} 加入 {teamName}",
    "auditlog.actionNames.eventColumn.member_invited":
      "已邀请 {memberNameAndEmail} 作为 {newRole} 加入工作区",
    "auditlog.actionNames.eventColumn.member_joined": "已加入工作区",
    "auditlog.actionNames.eventColumn.member_joined_team":
      "已作为 {teamRole} 加入 {teamName}",
    "auditlog.actionNames.eventColumn.member_left": "已离开工作区",
    "auditlog.actionNames.eventColumn.member_left_team": "已离开 {teamName}",
    "auditlog.actionNames.eventColumn.member_removed":
      "已将 {memberNameAndEmail} 从工作区中移除",
    "auditlog.actionNames.eventColumn.member_removed_from_team":
      "已将 {memberNameAndEmail} 从 {teamName} 中移除",
    "auditlog.actionNames.eventColumn.member_role_updated":
      "已将 {memberNameAndEmail} 从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.member_team_role_updated":
      "{teamName} 中的 {memberNameAndEmail} 已从 {oldTeamRole} 更新为 {newTeamRole}",
    "auditlog.actionNames.eventColumn.member_updated":
      "已将成员更新为 {newRole}",
    "auditlog.actionNames.eventColumn.old_domain": "原域名为“{oldDomain}”",
    "auditlog.actionNames.eventColumn.otherWorkspace": "另一个工作区",
    "auditlog.actionNames.eventColumn.page_access_requests_toggled":
      "来自非成员的页面访问请求",
    "auditlog.actionNames.eventColumn.page_created_general": "已创建页面",
    "auditlog.actionNames.eventColumn.page_created_private": "已创建私人页面",
    "auditlog.actionNames.eventColumn.page_created_team":
      "已在 {teamName} 下创建页面",
    "auditlog.actionNames.eventColumn.page_created_under":
      "已使用 {parentPageName} 创建页面",
    "auditlog.actionNames.eventColumn.page_created_workspace":
      "已在工作区中创建页面",
    "auditlog.actionNames.eventColumn.page_deleted": "已删除 {pageName}",
    "auditlog.actionNames.eventColumn.page_deleted_private": "已删除私人页面",
    "auditlog.actionNames.eventColumn.page_exported": "已导出 {pageName}",
    "auditlog.actionNames.eventColumn.page_exported_private": "已导出私人页面",
    "auditlog.actionNames.eventColumn.page_moved":
      "已将 {pageName} 从 {oldParentName} 移动到 {newParentName}",
    "auditlog.actionNames.eventColumn.page_moved_private": "已移动私人页面",
    "auditlog.actionNames.eventColumn.page_moved_team":
      "已将 {pageName} 从 {oldTeamAndPage} 移动到 {newTeamAndPage}",
    "auditlog.actionNames.eventColumn.page_permanently_deleted":
      "永久删除 {pageName}",
    "auditlog.actionNames.eventColumn.page_permissions_private":
      "已更新私人页面的权限",
    "auditlog.actionNames.eventColumn.page_permissions_under":
      '已更新 "{pageName}" 的权限',
    "auditlog.actionNames.eventColumn.page_permissions_updated_team":
      "{teamName} 的 {pageName} 权限已从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.page_permissions_updated_workspace_bot":
      "bot {botName} 对 {pageName} 的权限已从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.page_permissions_updated_workspace_default":
      "{memberNameAndEmail} 对 {pageName} 的权限已从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.page_permissions_updated_workspace_guest":
      "已将访客 {guestNameAndEmail} 的 {pageName} 权限从 {oldRole} 更新为{newRole}。",
    "auditlog.actionNames.eventColumn.page_permissions_updated_workspace_space":
      "已为工作区中的所有人将 {pageName} 的权限从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.page_restored": "已恢复 {pageName}",
    "auditlog.actionNames.eventColumn.page_restored_private": "已恢复私人页面",
    "auditlog.actionNames.eventColumn.page_shared_to_web":
      "已将 {pageName} 分享到网络",
    "auditlog.actionNames.eventColumn.page_shared_to_web.disabled":
      "已禁用将 {pageName} 分享到网络",
    "auditlog.actionNames.eventColumn.page_shared_to_web.enabled":
      "已启用将 {pageName} 分享到网络",
    "auditlog.actionNames.eventColumn.page_viewed_private": "已查看私人页面",
    "auditlog.actionNames.eventColumn.page_viewed_under": "已查看 {pageName}",
    "auditlog.actionNames.eventColumn.pages_to_other_workspaces_toggled":
      "将页面移动或保存副本到其他工作区",
    "auditlog.actionNames.eventColumn.password_changed": "已更改登录密码",
    "auditlog.actionNames.eventColumn.password_cleared": "已清除登录密码",
    "auditlog.actionNames.eventColumn.password_set": "已创建登录密码",
    "auditlog.actionNames.eventColumn.picture_changed": "已更改个人资料图片",
    "auditlog.actionNames.eventColumn.preferred_name_changed":
      "已将名称从“{oldValue}”更改为“{newValue}”",
    "auditlog.actionNames.eventColumn.preferred_name_changed_from_value":
      "已删除原名称“{oldValue}”",
    "auditlog.actionNames.eventColumn.preferred_name_changed_generic":
      "名称已更改",
    "auditlog.actionNames.eventColumn.preferred_name_changed_to_value":
      "将名称设置为“{newValue}”",
    "auditlog.actionNames.eventColumn.private": "私人",
    "auditlog.actionNames.eventColumn.private_page": "私人页面",
    "auditlog.actionNames.eventColumn.private_team": "私人团队空间",
    "auditlog.actionNames.eventColumn.public_page_changed":
      "将公共主页从“{oldPage}”更改为“{newPage}”",
    "auditlog.actionNames.eventColumn.public_page_set":
      "将“{newPage}”设置为公共主页",
    "auditlog.actionNames.eventColumn.public_page_sharing_toggled":
      "公开分享页面的成员",
    "auditlog.actionNames.eventColumn.team": "团队空间",
    "auditlog.actionNames.eventColumn.team_access_level_types.team_members":
      "任何团队成员",
    "auditlog.actionNames.eventColumn.team_access_level_types.team_owners":
      "仅限团队所有者",
    "auditlog.actionNames.eventColumn.team_access_level_types.unknown": "未知",
    "auditlog.actionNames.eventColumn.team_and_page": "团队空间和页面",
    "auditlog.actionNames.eventColumn.team_archived": "已归档 {teamName}",
    "auditlog.actionNames.eventColumn.team_created": "已创建 {teamName}",
    "auditlog.actionNames.eventColumn.team_creation_admins_setting_disabled":
      "已禁用成员创建团队空间",
    "auditlog.actionNames.eventColumn.team_creation_admins_setting_enabled":
      "已启用成员创建团队空间",
    "auditlog.actionNames.eventColumn.team_default_disabled":
      "已从默认团队空间列表中移除 {teamName} 。工作区成员将不再自动添加到该团队空间中",
    "auditlog.actionNames.eventColumn.team_default_enabled":
      "已将 {teamName} 添加到默认团队空间列表中。工作区成员将自动添加到该团队空间中",
    "auditlog.actionNames.eventColumn.team_description_changed":
      "已更改 {teamName} 的描述",
    "auditlog.actionNames.eventColumn.team_export_disabled":
      "已为 {teamName} 禁用导出",
    "auditlog.actionNames.eventColumn.team_export_enabled":
      "已为 {teamName} 启用导出",
    "auditlog.actionNames.eventColumn.team_guests_toggled.team_space_equal":
      ". 此设置与当前工作区设置相同",
    "auditlog.actionNames.eventColumn.team_guests_toggled.team_space_less_restrictive":
      ". 此设置比当前的工作区设置限制更少",
    "auditlog.actionNames.eventColumn.team_guests_toggled.team_space_more_restrictive":
      ". 此设置比当前的工作区设置限制更多",
    "auditlog.actionNames.eventColumn.team_guests_toggled_disabled":
      "已禁用 {teamName} 的访客",
    "auditlog.actionNames.eventColumn.team_guests_toggled_enabled":
      "已启用 {teamName} 的访客",
    "auditlog.actionNames.eventColumn.team_icon_changed":
      "已更改 {teamName} 的图标",
    "auditlog.actionNames.eventColumn.team_invite_access_changed":
      "更改了谁可以为 {teamName} 邀请团队成员加入 {newType}",
    "auditlog.actionNames.eventColumn.team_level_guest": "团队空间访客",
    "auditlog.actionNames.eventColumn.team_member": "团队空间成员",
    "auditlog.actionNames.eventColumn.team_member_default_permission_updated":
      "已将 {teamName} 中团队空间成员的默认页面权限从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.team_name_changed":
      "已更改团队空间名称 {oldTeamNameToNewTeamName}",
    "auditlog.actionNames.eventColumn.team_owner": "团队空间所有者",
    "auditlog.actionNames.eventColumn.team_parent_page":
      "{teamName} 页面 {parentPage}",
    "auditlog.actionNames.eventColumn.team_privacy_type_changed":
      "{teamName} 的团队隐私类型已从 {oldType} 更改为 {newType}",
    "auditlog.actionNames.eventColumn.team_privacy_types.closed": "封闭式",
    "auditlog.actionNames.eventColumn.team_privacy_types.open": "开放式",
    "auditlog.actionNames.eventColumn.team_privacy_types.private": "私人",
    "auditlog.actionNames.eventColumn.team_privacy_types.unknown":
      "未知的隐私状态",
    "auditlog.actionNames.eventColumn.team_public_page_sharing_disabled":
      "已禁用成员公开分享 {teamName} 下的页面",
    "auditlog.actionNames.eventColumn.team_public_page_sharing_enabled":
      "已启用成员公开分享 {teamName} 下的页面",
    "auditlog.actionNames.eventColumn.team_restored": "已恢复 {teamName}",
    "auditlog.actionNames.eventColumn.team_sidebar_editing_disabled":
      "已禁用成员更改 {teamName} 的侧边栏部分",
    "auditlog.actionNames.eventColumn.team_sidebar_editing_enabled":
      "已启用成员更改 {teamName} 的侧边栏部分",
    "auditlog.actionNames.eventColumn.team_workspace_default_permission_updated":
      "工作区中 {teamName} 的其他所有人的默认页面权限已从 {oldRole} 更新为 {newRole}",
    "auditlog.actionNames.eventColumn.thisWorkspace": "此工作区",
    "auditlog.actionNames.eventColumn.toggleEvent.disabled":
      "已禁用 {workspaceSetting}",
    "auditlog.actionNames.eventColumn.toggleEvent.enabled":
      "已启用 {workspaceSetting}",
    "auditlog.actionNames.eventColumn.under_private_page_in_team":
      "{teamName} 中的私人页面",
    "auditlog.actionNames.eventColumn.under_private_team_and_private_parent_page":
      "私人团队空间页面",
    "auditlog.actionNames.eventColumn.untitled_page": "无标题页面",
    "auditlog.actionNames.eventColumn.user_deleted": "用户已删除",
    "auditlog.actionNames.eventColumn.workspace": "工作区",
    "auditlog.actionNames.eventColumn.workspaceLevel": "工作区级别",
    "auditlog.actionNames.eventColumn.workspace_creation_set_for_email_domain":
      "已更改工作区创建设置 {before}{after}。",
    "auditlog.actionNames.eventColumn.workspace_creation_set_for_email_domain.fallback_message":
      "已更改工作区创建设置",
    "auditlog.actionNames.eventColumn.workspace_domain_changed":
      "已将工作区域名 {oldValue} 更改为“{newValue}”",
    "auditlog.actionNames.eventColumn.workspace_exported":
      "已导出所有工作区内容",
    "auditlog.actionNames.eventColumn.workspace_icon_changed":
      "已更改工作区图标",
    "auditlog.actionNames.eventColumn.workspace_integration_restriction_changed.approved_only":
      "已禁用成员安装集成",
    "auditlog.actionNames.eventColumn.workspace_integration_restriction_changed.disabled_built_by_notion.from_approved_or_built_by_notion":
      "已禁用自动批准由 Notion 构建的集成",
    "auditlog.actionNames.eventColumn.workspace_integration_restriction_changed.enabled_built_by_notion":
      "已启用自动批准由 Notion 构建的集成",
    "auditlog.actionNames.eventColumn.workspace_integration_restriction_changed.fallback_message":
      "已更改工作区集成限制",
    "auditlog.actionNames.eventColumn.workspace_integration_restriction_changed.no_restrictions":
      "已启用成员安装集成",
    "auditlog.actionNames.eventColumn.workspace_name_changed":
      "已将工作区名称从“{oldValue}”更改为“{newValue}”",
    "auditlog.actionNames.eventColumn.workspace_sidebar_editing_toggled":
      "更改工作区部分的成员",
    "auditlog.actionNames.public_page_cleared": "已清除公共主页链接",
    "auditlog.actionNames.revoked_support_access":
      "已撤消 {name} 的支持访问权限",
    "auditlog.actionNames.saml_disabled": "已禁用 SAML",
    "auditlog.actionNames.saml_enabled": "已启用 SAML",
    "auditlog.actionNames.saml_enforced": "已启用强制实施 SAML",
    "auditlog.actionNames.saml_unenforced": "已禁用强制实施 SAML",
    "auditlog.actionNames.scim_token_generated": "生成的 API SCIM 令牌",
    "auditlog.actionNames.scim_token_revoked": "撤销的 API SCIM 令牌",
    "auditlog.error.loadCurrentAuditLogError": "无法加载审计日志",
    "auditlog.logTable.dateColumn.header": "日期",
    "auditlog.logTable.eventColumn.header": "事件",
    "auditlog.logTable.nextPage": "下一个",
    "auditlog.logTable.noResults": "无结果",
    "auditlog.logTable.noResultsHelpText":
      "尝试不同的筛选器。日志可能需要一些时间才能显示出来。",
    "auditlog.logTable.previousPage": "上一个",
    "auditlog.logTable.userColumn.header": "用户",
    "auditlog.title": "审计日志",
    "auditlogActorFilter.removed_user": "已删除",
    "auditlogActorFilter.searchActor.placeholder": "搜索用户…",
    "auditlogActorFilter.searchActor.resultsTitle": "选择用户",
    "auditlogActorFilter.title": "用户",
    "auditlogDateFilter.quickFilters.lastMonth": "过去 30 天",
    "auditlogDateFilter.quickFilters.lastWeek": "过去 7 天",
    "auditlogDateFilter.quickFilters.today": "今天",
    "auditlogDateFilter.quickFilters.yesterday": "昨天",
    "auditlogDateFilter.timeToggle": "使用时间",
    "auditlogDateFilter.title": "日期",
    "auditlogEventFilter.actionName.email_changed": "邮件已更改",
    "auditlogEventFilter.actionName.file_downloaded": "已下载的文件",
    "auditlogEventFilter.actionName.file_uploaded": "文件已上传",
    "auditlogEventFilter.actionName.guest_removed": "访客已删除",
    "auditlogEventFilter.actionName.invite_link_toggled": "已切换邀请链接",
    "auditlogEventFilter.actionName.login": "登录",
    "auditlogEventFilter.actionName.logout": "登出",
    "auditlogEventFilter.actionName.member_invited": "成员已邀请",
    "auditlogEventFilter.actionName.member_joined": "成员已加入",
    "auditlogEventFilter.actionName.member_removed": "成员已删除",
    "auditlogEventFilter.actionName.member_role_updated": "成员角色已更新",
    "auditlogEventFilter.actionName.page_created": "页面已创建",
    "auditlogEventFilter.actionName.page_deleted": "页面已删除",
    "auditlogEventFilter.actionName.page_exported": "页面已导出",
    "auditlogEventFilter.actionName.page_moved": "页面已移动",
    "auditlogEventFilter.actionName.page_permission_updated": "页面权限已更新",
    "auditlogEventFilter.actionName.page_restored": "页面已恢复",
    "auditlogEventFilter.actionName.page_shared_to_web": "已分享到网络的页面",
    "auditlogEventFilter.actionName.page_viewed": "页面已查看",
    "auditlogEventFilter.actionName.password_changed": "密码已更改",
    "auditlogEventFilter.actionName.password_cleared": "密码已清除",
    "auditlogEventFilter.actionName.password_set": "密码已设置",
    "auditlogEventFilter.actionName.picture_changed": "图片已更改",
    "auditlogEventFilter.actionName.preferred_name_changed": "名称已更改",
    "auditlogEventFilter.actionName.user_deleted": "用户已删除",
    "auditlogEventFilter.actionNames.allowed_email_domain_added":
      "添加了允许的电子邮件域名",
    "auditlogEventFilter.actionNames.allowed_email_domain_removed":
      "删除了允许的电子邮件域名",
    "auditlogEventFilter.actionNames.allowed_support_access":
      "已授予支持访问权限",
    "auditlogEventFilter.actionNames.automatic_account_creation_toggled":
      "已切换至在登录时自动创建帐户",
    "auditlogEventFilter.actionNames.disable_guests_toggled": "已切换禁用访客",
    "auditlogEventFilter.actionNames.export_toggled": "已切换导出",
    "auditlogEventFilter.actionNames.group_added_to_team":
      "群组已添加到团队空间",
    "auditlogEventFilter.actionNames.group_removed_from_team":
      "群组已从团队空间中移除",
    "auditlogEventFilter.actionNames.idp_metadata_url_updated":
      "IDP 元数据 URL 已更新",
    "auditlogEventFilter.actionNames.idp_metadata_xml_removed":
      "IDP 元数据 XML 已删除",
    "auditlogEventFilter.actionNames.idp_metadata_xml_updated":
      "IDP 元数据 XML 已更新",
    "auditlogEventFilter.actionNames.invite_link_reset": "邀请链接重置",
    "auditlogEventFilter.actionNames.member_added_to_team":
      "成员已添加到团队空间",
    "auditlogEventFilter.actionNames.member_joined_team": "成员已加入团队空间",
    "auditlogEventFilter.actionNames.member_left_team": "成员已离开团队空间",
    "auditlogEventFilter.actionNames.member_removed_from_team":
      "成员已从团队空间中移除",
    "auditlogEventFilter.actionNames.member_team_role_updated":
      "已更新团队空间的成员角色",
    "auditlogEventFilter.actionNames.page_access_requests_toggled":
      "已切换页面访问请求",
    "auditlogEventFilter.actionNames.pages_to_other_workspaces_toggled":
      "页面已切换到其他工作区",
    "auditlogEventFilter.actionNames.public_page_cleared": "已清除公共主页链接",
    "auditlogEventFilter.actionNames.public_page_set": "公共主页设置",
    "auditlogEventFilter.actionNames.public_page_sharing_toggled":
      "已切换公共页面共享",
    "auditlogEventFilter.actionNames.revoked_support_access":
      "已撤销支持访问权限",
    "auditlogEventFilter.actionNames.saml_enforce_toggled":
      "已切换至强制执行 SAML",
    "auditlogEventFilter.actionNames.saml_toggled": "已切换至启用 SAML",
    "auditlogEventFilter.actionNames.scim_token_generated": "已生成 SCIM 令牌",
    "auditlogEventFilter.actionNames.scim_token_revoked": "已撤销 SCIM 令牌",
    "auditlogEventFilter.actionNames.team_archived": "团队空间已归档",
    "auditlogEventFilter.actionNames.team_created": "团队空间已创建",
    "auditlogEventFilter.actionNames.team_creation_admins_setting_toggled":
      "已更改只有管理员才能创建团队空间",
    "auditlogEventFilter.actionNames.team_default_toggled":
      "已切换团队空间默认值",
    "auditlogEventFilter.actionNames.team_description_changed":
      "团队空间描述已更改",
    "auditlogEventFilter.actionNames.team_export_toggled":
      "已切换团队空间导出功能",
    "auditlogEventFilter.actionNames.team_guests_toggled": "已切换团队禁用访客",
    "auditlogEventFilter.actionNames.team_icon_changed": "团队空间图标已更改",
    "auditlogEventFilter.actionNames.team_invite_access_changed":
      "团队邀请访问权限已更改",
    "auditlogEventFilter.actionNames.team_member_default_permission_updated":
      "已更新团队空间成员默认权限",
    "auditlogEventFilter.actionNames.team_name_changed": "团队空间名称已更改",
    "auditlogEventFilter.actionNames.team_privacy_type_changed":
      "团队隐私类型已更改",
    "auditlogEventFilter.actionNames.team_public_page_sharing_toggled":
      "已切换团队空间公共页面共享权限",
    "auditlogEventFilter.actionNames.team_restored": "团队空间已恢复",
    "auditlogEventFilter.actionNames.team_sidebar_editing_toggled":
      "已切换团队空间侧边栏编辑权限",
    "auditlogEventFilter.actionNames.team_workspace_default_permission_updated":
      "已更新团队空间的工作区默认权限",
    "auditlogEventFilter.actionNames.workspace_creation_set_for_email_domain":
      "工作区创建设置已更新",
    "auditlogEventFilter.actionNames.workspace_domain_changed": "已更改域名",
    "auditlogEventFilter.actionNames.workspace_exported": "内容已导出",
    "auditlogEventFilter.actionNames.workspace_icon_changed": "图标已更改",
    "auditlogEventFilter.actionNames.workspace_integration_restriction_changed":
      "已切换集成安装",
    "auditlogEventFilter.actionNames.workspace_name_changed": "名称已更改",
    "auditlogEventFilter.actionNames.workspace_sidebar_editing_toggled":
      "已切换工作区侧边栏编辑",
    "auditlogEventFilter.applyButton": "应用",
    "auditlogEventFilter.categoryName.account": "帐户",
    "auditlogEventFilter.categoryName.page": "页面",
    "auditlogEventFilter.categoryName.team": "团队空间",
    "auditlogEventFilter.categoryName.workspace": "工作区",
    "auditlogEventFilter.clearButton": "清除",
    "auditlogEventFilter.title": "事件",
    "backlink.currentPageTokenLabel": "此页面",
    "backlink.originalTokenLabel": "原始",
    "block.imageCaption.placeholder": "写一个标题…",
    "block.propertyTypeName.caption": "标题",
    "block.propertyTypeName.checked": "已选",
    "block.propertyTypeName.description": "描述",
    "block.propertyTypeName.language": "语言",
    "block.propertyTypeName.link": "链接",
    "block.propertyTypeName.size": "大小",
    "block.propertyTypeName.source": "来源",
    "block.propertyTypeName.title": "标题",
    "block.selectableAddMenu.tooltip.addBelow":
      "按住 Option 键点击<mediumcolor>以在右侧添加块</mediumcolor>",
    "block.selectableAddMenu.tooltip.addRight":
      "点击<mediumcolor>以在下方添加块</mediumcolor>",
    "blockAuthorInfo.label": "上次由{author}编辑",
    "blockAuthorInfo.restrictedBadge": "已受限",
    "blockAuthorInfo.restrictedBadge.clickText": "点击查看访问权限",
    "blockAuthorInfo.restrictedBadge.infoText": "访问受限于父页面",
    "blockDiscussionMenu.emptyState.noCommentsMessage": "无评论。",
    "blockDiscussionMenu.emptyState.noResolvedCommentsMessage":
      "没有已解决的评论。",
    "blockDiscussionMenu.mobileMenu.title": "评论",
    "blockDiscussionMenu.openDiscussionsTab.title":
      "进行中 ({numberOfOpenDiscussions})",
    "blockDiscussionMenu.resolvedDiscussionsTab.title":
      "已解决 ({numberOfResolvedDiscussions})",
    "blockHelpers.abstractBlockType": "Abstract",
    "blockHelpers.audioBlockType": "音频",
    "blockHelpers.codepenBlockType": "CodePen",
    "blockHelpers.deepnoteBlockType": "Deepnote",
    "blockHelpers.driveBlockType": "谷歌云端硬盘",
    "blockHelpers.embedBlockType": "嵌入",
    "blockHelpers.excalidrawBlockType": "Excalidraw",
    "blockHelpers.figmaBlockType": "Figma",
    "blockHelpers.fileBlockType": "文件",
    "blockHelpers.framerBlockType": "Framer",
    "blockHelpers.gistBlockType": "Gist",
    "blockHelpers.hexBlockType": "十六进制",
    "blockHelpers.imageBlockType": "图片",
    "blockHelpers.invisionBlockType": "Invision",
    "blockHelpers.loomBlockType": "Loom",
    "blockHelpers.mapsBlockType": "地图",
    "blockHelpers.miroBlockType": "Miro",
    "blockHelpers.pdfBlockType": "PDF",
    "blockHelpers.replitBlockType": "Replit",
    "blockHelpers.sketchBlockType": "Sketch",
    "blockHelpers.tweetBlockType": "推文",
    "blockHelpers.typeformBlockType": "Typeform",
    "blockHelpers.videoBlockType": "视频",
    "blockHelpers.whimsicalBlockType": "Whimsical",
    "blockMenu.actionButton.label": "动作",
    "blockMenu.filterForActions.placeholder": "搜索动作…",
    "blockMenuRestrictedMessage.adminRestoreAction.label": "恢复权限",
    "blockMenuRestrictedMessage.label": "你无权编辑此块，因为它受到限制。",
    "blockPasteMenu.actions.createTransclusion.title": "粘贴并同步",
    "blockPasteMenu.actions.dismiss.title": "解除",
    "blockPasteMenu.actions.linkToPage.title": "指向页面的链接",
    "blockPermissionsSettings.botPermission.tooltip":
      "这是你工作区中的一个集成服务。",
    "blockPermissionsSettings.confirmationDialog.private.message":
      "确定将当前页面变为私有？<semibold>私有化后只有你可以访问它。</semibold>",
    "blockPermissionsSettings.confirmationDialog.privateButton.label":
      "移动到私人",
    "blockPermissionsSettings.confirmationDialog.workspace.message":
      "确定与工作区分享此页面吗？<semibold>所有 {memberCount} 位成员都将可以访问。</semibold>",
    "blockPermissionsSettings.confirmationDialog.workspaceButton.label":
      "移动到工作区",
    "blockPermissionsSettings.copyLinkButton.label": "复制链接",
    "blockPermissionsSettings.groupPermission.label": "组",
    "blockPermissionsSettings.groupPermission.none":
      "{numberOfGroupMembers, plural, other {{numberOfGroupMembers} 位群组成员}}",
    "blockPermissionsSettings.groupPermission.tooltip":
      "将此页面显示在{groupName}群组成员的<boldtext>共享</boldtext>侧边栏分组中。",
    "blockPermissionsSettings.groupPermissionUsers.tooltip":
      "其他 {countRemainingUsers} 位…",
    "blockPermissionsSettings.learnAboutAutogeneratedDomains.changingLinks":
      "公共链接正在发生变化。",
    "blockPermissionsSettings.learnAboutAutogeneratedDomains.openSettingsCTA":
      "设置",
    "blockPermissionsSettings.learnAboutAutogeneratedDomains.setDomainForPublicLinks":
      "为以下位置的公共链接设置域名",
    "blockPermissionsSettings.learnAboutAutogeneratedDomains.transition":
      "了解有关转换的更多信息",
    "blockPermissionsSettings.learnAboutSharing.prompt": "了解共享",
    "blockPermissionsSettings.learnMore.prompt": "了解更多",
    "blockPermissionsSettings.mobileShareMenu.title": "分享",
    "blockPermissionsSettings.moveToButton.label": "移动到",
    "blockPermissionsSettings.offline.prompt": "连接网络后便可发布并分享。",
    "blockPermissionsSettings.permissionItem.linkSharing": "分享到网络",
    "blockPermissionsSettings.permissionItem.teamAccess": "{teamName} 的成员",
    "blockPermissionsSettings.permissionItem.teamAccess.privateTeam":
      "私人团队的团队成员",
    "blockPermissionsSettings.permissionItem.teamOwnerAccess":
      "{teamName} 的所有者",
    "blockPermissionsSettings.permissionItem.workspaceAccessNew":
      "{workspaceName}中的所有人",
    "blockPermissionsSettings.permissionsForBot.label": "集成服务",
    "blockPermissionsSettings.permissionsForBot.personalBot.label":
      "仅对你可见",
    "blockPermissionsSettings.permissionsForBot.spaceBot.label":
      "已通过工作区分享",
    "blockPermissionsSettings.privatePermissions.tooltip":
      "只有你可以访问此页面。",
    "blockPermissionsSettings.publicLinkInfo.tooltip":
      "此页面有公共链接访问权限，拥有链接的任何人都可以查看。",
    "blockPermissionsSettings.publicPermission.canComment":
      "任何有链接的人都可以发表评论",
    "blockPermissionsSettings.publicPermission.canEdit":
      "任何有链接的人都可以编辑和评论",
    "blockPermissionsSettings.publicPermission.canRead":
      "任何有链接的人都可以查看",
    "blockPermissionsSettings.publicPermission.none": "发布并与任何人分享链接",
    "blockPermissionsSettings.publicPermission.tooltip":
      "知道链接的任何人都可以访问此页面。",
    "blockPermissionsSettings.restrictedPermissions.tooltip":
      "访问权限基于{inlineIconAndName}。更改后将不再继承父页面的权限。",
    "blockPermissionsSettings.sentInvitation.message": "已发送邀请",
    "blockPermissionsSettings.spacePermission.none":
      "{numberOfWorkspaceMembers, plural, other {{numberOfWorkspaceMembers} 位工作区成员}}",
    "blockPermissionsSettings.spacePermission.tooltip":
      "将此页面显示在工作区所有成员的<boldtext>工作区</boldtext>侧边栏分组中。",
    "blockPermissionsSettings.teamOwnerPermission.subtitle":
      "{teamOwnersCount, plural, other {{teamOwnersCount} 个人}}",
    "blockPermissionsSettings.teamOwnerPermission.tooltip":
      "适用于 {teamName} 的全部所有者（共 {ownerCount} 人）。",
    "blockPermissionsSettings.teamPermission.subtitle":
      "{membersCount, plural, other {{membersCount} 个团队成员}}",
    "blockPermissionsSettings.teamPermission.tooltip":
      "适用于 {teamName} 的全部所有者和非访客团队成员（共 {memberCount} 个）。",
    "blockPermissionsSettings.userPermissions.tooltip":
      "只有你和其他受邀成员或访客才能通过链接查看此页面。",
    "blockPermissionsSettings.workspacePermissions.tooltip":
      "此页面具有工作区访问权限，工作区中的任何人都可以通过链接查看此页面。",
    "blockPropertyValue.filterForNumberFormats.placeholder": "筛选格式...",
    "blockTemplates.board.assignPropertyTitle": "指派",
    "blockTemplates.board.card1Title": "卡片 1",
    "blockTemplates.board.card2Title": "卡片 2",
    "blockTemplates.board.card3Title": "卡片 3",
    "blockTemplates.board.namePropertyTitle": "名称",
    "blockTemplates.board.statusPropertyGreenOptionTitle": "已完成",
    "blockTemplates.board.statusPropertyRedOptionTitle": "未开始",
    "blockTemplates.board.statusPropertyTitle": "状态",
    "blockTemplates.board.statusPropertyYellowOptionTitle": "进行中",
    "blockTemplates.board.viewTitle": "看板视图",
    "blockTemplates.calendar.datePropertyTitle": "日期",
    "blockTemplates.calendar.namePropertyTitle": "名称",
    "blockTemplates.calendar.tagsPropertyTitle": "标签",
    "blockTemplates.calendar.viewTitle": "日历视图",
    "blockTemplates.gallery.createdPropertyTitle": "创建时间",
    "blockTemplates.gallery.namePropertyTitle": "名称",
    "blockTemplates.gallery.page1CompletedTodoTitle": "已完成的待办事项",
    "blockTemplates.gallery.page1Title": "页面 1",
    "blockTemplates.gallery.page1TodoTitle": "待办事项",
    "blockTemplates.gallery.page2Title": "页面 2",
    "blockTemplates.gallery.page3Title": "页面 3",
    "blockTemplates.gallery.tagsPropertyTitle": "标签",
    "blockTemplates.gallery.viewTitle": "画廊视图",
    "blockTemplates.list.createdPropertyTitle": "创建时间",
    "blockTemplates.list.namePropertyTitle": "名称",
    "blockTemplates.list.page1Title": "页面 1",
    "blockTemplates.list.page2Title": "页面 2",
    "blockTemplates.list.page3Title": "页面 3",
    "blockTemplates.list.tab1Title": "选项卡 1",
    "blockTemplates.list.tab2Title": "选项卡 2",
    "blockTemplates.list.tab3Title": "选项卡 3",
    "blockTemplates.list.tagsPropertyTitle": "标签",
    "blockTemplates.list.viewTitle": "列表视图",
    "blockTemplates.table.namePropertyTitle": "名称",
    "blockTemplates.table.tagsPropertyTitle": "标签",
    "blockTemplates.templateButton.addNewTodoTitle": "添加待办事项",
    "blockTemplates.timeline.datePropertyTitle": "日期",
    "blockTemplates.timeline.viewTitle": "时间轴视图",
    "blocks.blockMenu.collectionHelpButton": "了解数据库",
    "blocks.hoverBlockMenu.collectionHelpButton": "了解数据库",
    "boardHiddenGroup.searchPlaceholder": "搜索页面…",
    "bookmarkBlock.addWebBookmark.placeholder": "添加 Web 书签",
    "bookmarkBlock.bookmark.title": "书签",
    "bookmarkBlock.editBookmark.linkPlaceholder": "以 https://… 格式粘贴",
    "bookmarkBlock.invalidLinkError.message": "请输入有效的链接",
    "bookmarkBlock.loadWhileFetching.message": "获取预览中",
    "bookmarkBlock.visualBookmark.create": "创建书签",
    "bookmarkBlock.visualBookmark.prompt": "从链接创建可视化书签。",
    "bootupHelpers.iosErrorRequiresReinstall.errorMessage":
      "你好。iOS应用程序检测到问题。删除此应用后，请在App Store中重新安装它。",
    "botActions.deleteBotConfirmationDialog.confirmDeleteBotButton.label":
      "是的",
    "botActions.deleteBotConfirmationDialog.confirmationMessage":
      "确定要撤销{integrationName}的访问权限吗？",
    "botMenuItem.spaceBot.label": "已通过工作区分享",
    "breadcrumb.mobileBreadcrumbMenu.title": "导航栏",
    "breadcrumb.moveTo.hasPermission.subtitle": "点击以移动",
    "breadcrumb.moveTo.hasPermission.title": "只有你有权访问",
    "breadcrumb.moveTo.privatePages": "私人",
    "breakingUpdateDialog.title": "我们刚刚推出了新功能！",
    "breakingUpdateDialog.updateButtonTitle": "更新并查看新功能",
    "bulletedListBlock.placeholder.label": "项目",
    "calendarItem.endsTime.message": "{endTime} 结束",
    "calendarSettings.startWeekOnMonday.label": "星期开始于周一",
    "calendarSettings.startWeekOnMonday.message":
      "这将更改你应用中所有日历的外观。",
    "calloutBlock.inputPlaceholder": "输入内容…",
    "capabilitiesTooltip.insertComment.enabled": "可以评论。",
    "capabilitiesTooltip.mixedAccess.readContent.enabled": "可以读取内容。",
    "capabilitiesTooltip.mixedAccess.title": "混合访问权限",
    "capabilitiesTooltip.mixedaccess.insertContent.disabled": "无法插入内容。",
    "capabilitiesTooltip.mixedaccess.insertContent.enabled": "可以插入内容。",
    "capabilitiesTooltip.mixedaccess.readContent.disabled": "无法读取内容。",
    "capabilitiesTooltip.mixedaccess.updateContent.disabled": "无法更新内容。",
    "capabilitiesTooltip.mixedaccess.updateContent.enabled": "可以更新内容。",
    "capabilitiesTooltip.readComment.enabled": "可以读取评论。",
    "capabilitiesTooltip.userAccess.readUserEmailAddresses.disabled":
      "无法查看用户电子邮件地址。",
    "capabilitiesTooltip.userAccess.readUserEmailAddresses.enabled":
      "可以查看用户电子邮件地址。",
    "capabilitiesTooltip.userAccess.readUsers.disabled": "无法查看用户。",
    "capabilitiesTooltip.userAccess.readUsers.enabled": "可以查看用户。",
    "chargeReminderEmail.billingLink.text":
      "<b><billinglink>点击此处查看你的账单设置</billinglink></b>",
    "chargeReminderEmail.billingType.ACHOrWire.text": "ACH 或电汇",
    "chargeReminderEmail.billingType.creditCard.text":
      "以<b> {last4Digits} </b>结尾的<b> {brand} </b>卡",
    "chargeReminderEmail.closingText": "谢谢你。{br} ──来自 Notion 团队",
    "chargeReminderEmail.greeting": "嗨，你好！",
    "chargeReminderEmail.reminderBody.text":
      "看起来你下个 Notion 计费周期的积分不足。温馨提醒：我们将于 {dateOfNextCharge}通过帐户上已设置的付款方式（{paymentMethod}）向你收取 <b>{amountToBeCharged}</b>。",
    "chargeReminderEmail.subjectLine.text":
      "Notion 提醒：你将于 7 天内被收取费用",
    "churnSurveyMenu.alternatives.airtable": "Airtable",
    "churnSurveyMenu.alternatives.alternativeOtherPlaceholder":
      "请告诉我们更多…",
    "churnSurveyMenu.alternatives.asana": "Asana",
    "churnSurveyMenu.alternatives.atlassianConfluence": "Confluence",
    "churnSurveyMenu.alternatives.atlassianJira": "Jira",
    "churnSurveyMenu.alternatives.coda": "Coda",
    "churnSurveyMenu.alternatives.description": "请选择一个或多个",
    "churnSurveyMenu.alternatives.dropboxPaper": "Dropbox Paper",
    "churnSurveyMenu.alternatives.evernote": "印象笔记国际版（Evernote）",
    "churnSurveyMenu.alternatives.googleDriveDocs": "谷歌云端硬盘/文档",
    "churnSurveyMenu.alternatives.microsoftOffice": "微软 / Office 365",
    "churnSurveyMenu.alternatives.other": "其他",
    "churnSurveyMenu.alternatives.quip": "Quip",
    "churnSurveyMenu.alternatives.title": "2. 你将使用什么其他工具？",
    "churnSurveyMenu.alternatives.trello": "Trello",
    "churnSurveyMenu.cancelButton.title": "取消",
    "churnSurveyMenu.continueDowngrade.downgradeMessage.personal":
      "如果你现在取消订阅，你仍可继续使用此付费方案的所有功能直到 {periodEnd}。你可以随时重新订阅或切换到另一个付费方案。{br}在 {periodEnd}后，此工作区将降级为免费的个人版，包含以下限制：<li>单人使用</li><li>工作区的访客限制为 5 个</li><li>上传文件每个最多 5MB</li><li>没有版本历史记录</li><li>没有与团队成员共享的工作区</li>",
    "churnSurveyMenu.continueDowngrade.downgradeMessage.team":
      "如果你现在取消订阅，你仍可继续使用此付费方案的所有功能直到 {periodEnd}。你可以随时重新订阅或切换到另一个付费方案。{br}在 {periodEnd}后，此工作区将降级为团队版的免费试用版，包含以下限制：<li>1,000 个块限制</li><li>上传文件每个最大 5MB</li><li>没有版本历史记录</li><li>没有批量导出</li><li>没有高级权限</li><li>没有权限群组</li>",
    "churnSurveyMenu.continueDowngrade.title": "继续降级？",
    "churnSurveyMenu.downgradeButton.title": "降级",
    "churnSurveyMenu.goBackButton.title": "返回到付费方案",
    "churnSurveyMenu.header.covidMessage":
      "💛 如果你受到 COVID-19 的影响，请<contactuslink>联系我们</contactuslink>以寻求帮助。",
    "churnSurveyMenu.header.description":
      "Notion 正在不断改善的旅途中。在你降级之前，我们希望你能告诉我们为什么，以便我们在今后为每个人提供更好的服务。感谢你的反馈意见。",
    "churnSurveyMenu.header.personal.title": "降级到个人版",
    "churnSurveyMenu.header.team.title": "降级到团队试用版",
    "churnSurveyMenu.other.otherFeedbackPlaceholder":
      "我们的团队将审核你的反馈，以使 Notion 变得更好。",
    "churnSurveyMenu.otherFeedback.title": "3. 对我们的反馈意见",
    "churnSurveyMenu.reasons.companyShuttingDown": "公司正在关闭或削减开支",
    "churnSurveyMenu.reasons.description": "请选择一个或多个",
    "churnSurveyMenu.reasons.missingFeatures": "缺少功能",
    "churnSurveyMenu.reasons.missingFeaturesPlaceholder":
      "让我们知道你还需要哪些功能…",
    "churnSurveyMenu.reasons.notUsingEnough": "没有经常使用",
    "churnSurveyMenu.reasons.other": "其他",
    "churnSurveyMenu.reasons.reasonOtherPlaceholder": "请告诉我们更多…",
    "churnSurveyMenu.reasons.securityComplianceRequirements":
      "安全性或合规性要求",
    "churnSurveyMenu.reasons.title": "1. 你降级的原因是什么？",
    "churnSurveyMenu.reasons.toDifficult": "太难用了",
    "churnSurveyMenu.reasons.tooExpensive": "太贵了",
    "churnSurveyMenu.reasons.trialOver": "试用期结束",
    "churnSurveyMenu.reasons.upgradedByMistake": "不小心升级",
    "churnSurveyMenu.reasons.usingAlternative": "使用替代方案",
    "clipboardActions.offlineError.message": "请连接网络后复制此块。",
    "clipboardActions.pasteFileIntoCommentError.message":
      "很抱歉，你无法将文件粘贴到评论中。",
    "clipboardInputRenderer.copyLink.message": "右键单击并复制上面的链接",
    "codeBlock.caption.button": "标题",
    "codeBlock.copyToClipboard.button": "复制",
    "codeBlock.databaseEditGroupMenu.addGroupTitle": "添加群组",
    "codeBlock.databaseEditGroupMenu.cancelButton.label": "取消",
    "codeBlock.databaseEditGroupMenu.doneButton.label": "完成",
    "codeBlock.databaseEditGroupMenu.renameGroupTitle": "重命名群组",
    "codeBlock.mobileCodePreviewMenu.doneButton.label": "完成",
    "codeBlock.mobileCodePreviewMenu.title": "代码预览",
    "codeBlock.mobileLanguageMenu.doneButton.label": "完成",
    "codeBlock.mobileLanguageMenu.title": "语言",
    "codeBlock.searchPrompt": "搜索语言…",
    "codepenBlock.embed.caption": "适用于启用了公共访问的 CodePen 链接",
    "codepenBlock.placeholder": "嵌入 CodePen",
    "collection.boardView.hiddenColumns.label": "隐藏分栏",
    "collection.boardView.hiddenGroups.label": "隐藏群组",
    "collection.boardView.selectProperty.defaultName": "状态",
    "collection.numberFormat.argentinePeso": "阿根廷比索",
    "collection.numberFormat.baht": "铢",
    "collection.numberFormat.brl": "巴西雷亚尔",
    "collection.numberFormat.canadianDollar": "加元",
    "collection.numberFormat.chileanPeso": "智利比索",
    "collection.numberFormat.colombianPeso": "哥伦比亚比索",
    "collection.numberFormat.danishKrone": "丹麦克朗",
    "collection.numberFormat.dirham": "迪拉姆",
    "collection.numberFormat.dollar": "美元",
    "collection.numberFormat.euro": "欧元",
    "collection.numberFormat.forint": "福林",
    "collection.numberFormat.franc": "法郎",
    "collection.numberFormat.hongKongDollar": "港元",
    "collection.numberFormat.idr": "印尼盾",
    "collection.numberFormat.koruna": "捷克克朗",
    "collection.numberFormat.krona": "瑞典克朗",
    "collection.numberFormat.leu": "列伊",
    "collection.numberFormat.mexicanPeso": "墨西哥比索",
    "collection.numberFormat.newTaiwanDollar": "新台币",
    "collection.numberFormat.newZealandDollar": "新西兰元",
    "collection.numberFormat.norwegianKrone": "挪威克朗",
    "collection.numberFormat.number": "数字",
    "collection.numberFormat.numberWithCommas": "带千位分隔符的数字",
    "collection.numberFormat.percent": "百分比",
    "collection.numberFormat.philippinePeso": "菲律宾比索",
    "collection.numberFormat.pound": "英磅",
    "collection.numberFormat.rand": "兰特",
    "collection.numberFormat.ringgit": "林吉特",
    "collection.numberFormat.riyal": "里亚尔",
    "collection.numberFormat.ruble": "卢布",
    "collection.numberFormat.rupee": "卢比",
    "collection.numberFormat.shekel": "谢克尔",
    "collection.numberFormat.try": "里拉",
    "collection.numberFormat.uruguayanPeso": "乌拉圭比索",
    "collection.numberFormat.won": "韩元",
    "collection.numberFormat.yen": "日元",
    "collection.numberFormat.yuan": "人民币",
    "collection.numberFormat.zloty": "兹罗提",
    "collectionBoardItem.actions.cancel": "取消",
    "collectionBoardItem.actions.reposition": "更改位置",
    "collectionBoardItem.actions.savePosition": "保存位置",
    "collectionBoardItem.edit.tooltip": "编辑",
    "collectionBoardItem.itemName.placeholder": "输入名称…",
    "collectionBoardItem.reposition.tooltip": "重命名、删除、移动等…",
    "collectionBoardItem.untitledBlock": "无标题",
    "collectionFilterCombinatorGrid.filterOperator.and": "与",
    "collectionFilterCombinatorGrid.filterOperator.and.lowercase": "与",
    "collectionFilterCombinatorGrid.filterOperator.or": "或",
    "collectionFilterCombinatorGrid.filterOperator.or.lowercase": "或",
    "collectionFilterMenu.dateFilter.relativeDateFilter.description":
      "筛选器将根据当前日期更新",
    "collectionFilterMenu.dateRangeFilter.relativeDateRangeFilter.description":
      "筛选器将根据当前日期更新",
    "collectionFilterMenuFilter.filterOperators.checkbox.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.date.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.file.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.multi_select.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.number.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.person.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.relation.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.select.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.status.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.filterOperators.text.order":
      "{operator}{operatorValue}",
    "collectionFilterMenuFilter.property.name": "属性",
    "collectionFilterMenuFilterOperatorValue.date.exact.order":
      "{exact}{dateValue}",
    "collectionFilterMenuFilterOperatorValue.dateRange.exact.order":
      "{exact}{dateValue}",
    "collectionFilterMenuHelpers.checkbox.checked": "已选",
    "collectionFilterMenuHelpers.checkbox.unchecked": "未选",
    "collectionFilterMenuHelpers.combinatorOperators.and": "与",
    "collectionFilterMenuHelpers.combinatorOperators.or": "或",
    "collectionFilterMenuHelpers.operator.any": "的任何值",
    "collectionFilterMenuHelpers.operator.any.lowercase": "任何",
    "collectionFilterMenuHelpers.operator.checkboxIs": "是",
    "collectionFilterMenuHelpers.operator.checkboxIs.lowercase": "是",
    "collectionFilterMenuHelpers.operator.checkboxIsNot": "不是",
    "collectionFilterMenuHelpers.operator.checkboxIsNot.lowercase": "不是",
    "collectionFilterMenuHelpers.operator.dateIs": "是",
    "collectionFilterMenuHelpers.operator.dateIs.lowercase": "是",
    "collectionFilterMenuHelpers.operator.dateIsAfter": "晚于",
    "collectionFilterMenuHelpers.operator.dateIsAfter.lowercase": "晚于",
    "collectionFilterMenuHelpers.operator.dateIsBefore": "早于",
    "collectionFilterMenuHelpers.operator.dateIsBefore.lowercase": "早于",
    "collectionFilterMenuHelpers.operator.dateIsOnOrAfter": "是或晚于",
    "collectionFilterMenuHelpers.operator.dateIsOnOrAfter.lowercase":
      "是或晚于",
    "collectionFilterMenuHelpers.operator.dateIsOnOrBefore": "是或早于",
    "collectionFilterMenuHelpers.operator.dateIsOnOrBefore.lowercase":
      "是或早于",
    "collectionFilterMenuHelpers.operator.dateIsWithin": "在",
    "collectionFilterMenuHelpers.operator.dateIsWithin.lowercase":
      "介于两者之间",
    "collectionFilterMenuHelpers.operator.enumContains": "包含",
    "collectionFilterMenuHelpers.operator.enumContains.lowercase": "包含",
    "collectionFilterMenuHelpers.operator.enumDoesNotContain": "不包含",
    "collectionFilterMenuHelpers.operator.enumDoesNotContain.lowercase":
      "不包含",
    "collectionFilterMenuHelpers.operator.enumIs": "是",
    "collectionFilterMenuHelpers.operator.enumIs.lowercase": "是",
    "collectionFilterMenuHelpers.operator.enumIsNot": "不是",
    "collectionFilterMenuHelpers.operator.enumIsNot.lowercase": "不是",
    "collectionFilterMenuHelpers.operator.every": "的每个值",
    "collectionFilterMenuHelpers.operator.every.lowercase": "每个",
    "collectionFilterMenuHelpers.operator.isEmpty": "为空",
    "collectionFilterMenuHelpers.operator.isEmpty.lowercase": "为空",
    "collectionFilterMenuHelpers.operator.isNotEmpty": "不为空",
    "collectionFilterMenuHelpers.operator.isNotEmpty.lowercase": "不为空",
    "collectionFilterMenuHelpers.operator.none": "没有值",
    "collectionFilterMenuHelpers.operator.none.lowercase": "无",
    "collectionFilterMenuHelpers.operator.numberDoesNotEqual": "≠",
    "collectionFilterMenuHelpers.operator.numberDoesNotEqual.lowercase": "≠",
    "collectionFilterMenuHelpers.operator.numberEquals": "=",
    "collectionFilterMenuHelpers.operator.numberEquals.lowercase": "=",
    "collectionFilterMenuHelpers.operator.numberGreaterThan": ">",
    "collectionFilterMenuHelpers.operator.numberGreaterThan.lowercase": ">",
    "collectionFilterMenuHelpers.operator.numberGreaterThanOrEqualTo": "≥",
    "collectionFilterMenuHelpers.operator.numberGreaterThanOrEqualTo.lowercase":
      "≥",
    "collectionFilterMenuHelpers.operator.numberLessThan": "<",
    "collectionFilterMenuHelpers.operator.numberLessThan.lowercase": "<",
    "collectionFilterMenuHelpers.operator.numberLessThanOrEqualTo": "≤",
    "collectionFilterMenuHelpers.operator.numberLessThanOrEqualTo.lowercase":
      "≤",
    "collectionFilterMenuHelpers.operator.personContains": "包含",
    "collectionFilterMenuHelpers.operator.personContains.lowercase": "包含",
    "collectionFilterMenuHelpers.operator.personDoesNotContain": "不包含",
    "collectionFilterMenuHelpers.operator.personDoesNotContain.lowercase":
      "不包含",
    "collectionFilterMenuHelpers.operator.relationContains": "包含",
    "collectionFilterMenuHelpers.operator.relationContains.lowercase": "包含",
    "collectionFilterMenuHelpers.operator.relationDoesNotContain": "不包含",
    "collectionFilterMenuHelpers.operator.relationDoesNotContain.lowercase":
      "不包含",
    "collectionFilterMenuHelpers.operator.statusIs": "是",
    "collectionFilterMenuHelpers.operator.statusIsNot": "不是",
    "collectionFilterMenuHelpers.operator.stringContains": "包含",
    "collectionFilterMenuHelpers.operator.stringContains.lowercase": "包含",
    "collectionFilterMenuHelpers.operator.stringDoesNotContain": "不包含",
    "collectionFilterMenuHelpers.operator.stringDoesNotContain.lowercase":
      "不包含",
    "collectionFilterMenuHelpers.operator.stringEndsWith": "结尾是",
    "collectionFilterMenuHelpers.operator.stringEndsWith.lowercase": "结尾是",
    "collectionFilterMenuHelpers.operator.stringHasNoAlphabetPrefix": "(禁用)",
    "collectionFilterMenuHelpers.operator.stringHasNoAlphabetPrefix.lowercase":
      "（未使用）",
    "collectionFilterMenuHelpers.operator.stringIs": "是",
    "collectionFilterMenuHelpers.operator.stringIs.lowercase": "是",
    "collectionFilterMenuHelpers.operator.stringIsNot": "不是",
    "collectionFilterMenuHelpers.operator.stringIsNot.lowercase": "不是",
    "collectionFilterMenuHelpers.operator.stringStartsWith": "开头是",
    "collectionFilterMenuHelpers.operator.stringStartsWith.lowercase": "开头是",
    "collectionFilterMenuHelpers.relativeDates.exactDate": "自定义日期",
    "collectionFilterMenuHelpers.relativeDates.exactDateRange": "自定义范围",
    "collectionFilterMenuHelpers.relativeDates.oneMonthAgo": "一个月前",
    "collectionFilterMenuHelpers.relativeDates.oneMonthFromNow": "一个月后",
    "collectionFilterMenuHelpers.relativeDates.oneWeekAgo": "一周前",
    "collectionFilterMenuHelpers.relativeDates.oneWeekFromNow": "一周后",
    "collectionFilterMenuHelpers.relativeDates.theNextMonth": "下月",
    "collectionFilterMenuHelpers.relativeDates.theNextWeek": "下周",
    "collectionFilterMenuHelpers.relativeDates.theNextYear": "明年",
    "collectionFilterMenuHelpers.relativeDates.thePastMonth": "上月",
    "collectionFilterMenuHelpers.relativeDates.thePastWeek": "上周",
    "collectionFilterMenuHelpers.relativeDates.thePastYear": "去年",
    "collectionFilterMenuHelpers.relativeDates.today": "今天",
    "collectionFilterMenuHelpers.relativeDates.tomorrow": "明天",
    "collectionFilterMenuHelpers.relativeDates.yesterday": "昨天",
    "collectionGalleryViewItem.action.cancel": "取消",
    "collectionGalleryViewItem.action.reposition": "更改位置",
    "collectionGalleryViewItem.action.savePosition": "保存位置",
    "collectionGalleryViewItem.itemName.placeholder": "输入名称…",
    "collectionGalleryViewItem.repositionAction.tooltip":
      "重命名、删除、移动等…",
    "collectionGalleryViewItem.untitledBlock": "无标题",
    "collectionHelpers.board.caption": "看板视图，适合项目规划以及错误跟踪",
    "collectionHelpers.board.displayName": "看板",
    "collectionHelpers.calendar.caption": "月视图，可用于事件计划和安排",
    "collectionHelpers.calendar.displayName": "日历",
    "collectionHelpers.gallery.caption": "卡片网格，可用于情绪板、索引卡和食谱",
    "collectionHelpers.gallery.displayName": "画廊",
    "collectionHelpers.list.caption": "简化的页面列表视图，适合书签和笔记",
    "collectionHelpers.list.displayName": "列表",
    "collectionHelpers.table.caption":
      "表格视图，存储和查看任何类型的结构化数据",
    "collectionHelpers.table.displayName": "表格",
    "collectionHelpers.timeline.caption": "时间轴视图，适合项目排期和计划",
    "collectionHelpers.timline.displayName": "时间轴",
    "collectionHiddenGroupsButton.hiddenGroupsButton.text":
      "{numberOfHiddenGroups, plural, other {{numberOfHiddenGroups} 个隐藏群组}}",
    "collectionNoDateMenu.addResultToCalendar.prompt": "点击添加到日历",
    "collectionNoDateMenu.addResultToTimeline.prompt": "点击添加到时间轴",
    "collectionNoDateMenu.loading.message": "载入中…",
    "collectionNoDateMenu.mobileMenuTitle": "没有日期的页面",
    "collectionNoDateMenu.noResults.title": "无结果",
    "collectionNoDateMenu.pagesWithNoDateInPrefix":
      "{noDateTotal, plural, other {{noDateTotal} 个页面没有日期・用于}}",
    "collectionNoDateMenu.searchPlaceholder": "搜索页面…",
    "collectionNoDateMenu.view.button.label": "视图",
    "collectionPicker.searchBarFilter.text": "筛选…",
    "collectionSettings.appCreateView.addOrPinView": "添加或固定视图",
    "collectionSettings.appCreateView.addViewInCollection":
      "在 {collectionName} 中添加视图并将其固定",
    "collectionSettings.appCreateView.newEmptyView": "新建视图",
    "collectionSettings.appCreateView.newViewInCollection":
      "新建 {collectionName} 的视图",
    "collectionSettingsAccountPicker.title": "选择帐户",
    "collectionSettingsCreateExternalViewPicker.authenticateBody.title":
      "链接您的 {integration} 帐户以获得更丰富的内容预览和无缝导入。",
    "collectionSettingsCreateExternalViewPicker.authenticateButton.title":
      "连接到 {integration}",
    "collectionSettingsCreateExternalViewPicker.authenticateHeader.title":
      "连接到 {integration}",
    "collectionSettingsCreateExternalViewPicker.currentAccountSection.label":
      "已连接到{integration}",
    "collectionSettingsCreateExternalViewPicker.error.unknown": "出了些问题。",
    "collectionSettingsCreateExternalViewPicker.filters.Issues": "问题",
    "collectionSettingsCreateExternalViewPicker.filters.PullRequests":
      "拉取请求",
    "collectionSettingsCreateExternalViewPicker.filters.all": "全部",
    "collectionSettingsCreateExternalViewPicker.filters.boards": "看板",
    "collectionSettingsCreateExternalViewPicker.filters.issues": "问题",
    "collectionSettingsCreateExternalViewPicker.filters.projects": "项目",
    "collectionSettingsCreateExternalViewPicker.filters.pullRequests":
      "拉取请求",
    "collectionSettingsCreateExternalViewPicker.filters.releases": "版本",
    "collectionSettingsCreateExternalViewPicker.loadingData":
      "正在加载可用源...",
    "collectionSettingsCreateExternalViewPicker.noResults.help":
      "尝试不同的搜索或粘贴任意 {integration} URL",
    "collectionSettingsCreateExternalViewPicker.noResults.text": "无结果",
    "collectionSettingsCreateExternalViewPicker.settingUpSync":
      "正在设置同步...",
    "collectionSettingsCreateExternalViewPicker.subHeader":
      "{integration} 的可用源。",
    "collectionSettingsCreateExternalViewPicker.syncSourceButton.label":
      "同步源",
    "collectionSettingsCreateExternalViewPicker.title":
      "从 {integration} 中选择",
    "collectionSettingsCreateExternalViewSource.authenticateBody.title":
      "链接你的 {integration} 帐户以获得更丰富的内容预览和无缝导入。",
    "collectionSettingsCreateExternalViewSource.authenticateButton.title":
      "连接到 {integration}",
    "collectionSettingsCreateExternalViewSource.authenticateHeader.title":
      "连接到 {integration}",
    "collectionSettingsCreateExternalViewSource.error.label":
      "无效的 {integration} 数据库 URL",
    "collectionSettingsCreateExternalViewSource.linkBody.title":
      "复制任意一个 {integration} URL，然后将其粘贴到下面开始同步。",
    "collectionSettingsCreateExternalViewSource.linkHeader.title":
      "链接 {integration}",
    "collectionSettingsCreateExternalViewSource.linkInput.label":
      "{integration} URL",
    "collectionSettingsCreateExternalViewSource.nextButton.label": "下一步",
    "collectionSettingsViewBlockAppConfiguration.confirmDialog.closeSettings.message":
      "确定要关闭自定义侧边栏吗？你的所有自定义都将丢失。",
    "collectionSettingsViewBlockAppConfiguration.confirmDialog.discardButton.label":
      "放弃更改",
    "collectionSettingsViewBlockAppConfiguration.confirmDialog.saveButton.label":
      "保存更改",
    "collectionSettingsViewBlockAppConfiguration.searchBar.placeholder":
      "添加或移除功能...",
    "collectionSettingsViewBlockCollection.databaseTab.deleteButton.text":
      "删除数据库",
    "collectionSettingsViewBlockCollection.databaseTab.deleteConfirmation":
      "确定要删除此数据库？",
    "collectionSortMenuRow.sortDirectionSelectMenu.ascending": "升序",
    "collectionSortMenuRow.sortDirectionSelectMenu.descending": "降序",
    "collectionSortMenuRow.sortDirectionSelectMenu.placeholder": "空",
    "collectionSortMenuRow.sortDirectionSelectMenu.title": "排序",
    "collectionTabBar.newViewPlaceholder.title": "新建视图",
    "collectionTabBar.showMoreViews.title": "其他 {moreViewsCount} 个...",
    "collectionTabBar.viewTab.tooltip": "{collection} 的 {viewType} 视图",
    "collectionViewBlock.action.filter.title": "筛选器",
    "collectionViewBlock.action.newItem.title": "新",
    "collectionViewBlock.action.noDateButton.noProperty.label":
      "无日期 ({noDateTotal})",
    "collectionViewBlock.action.sort.title": "排序",
    "collectionViewBlock.actionBar.offlineTemplatePicker.message":
      "请连接网络以使用模板。",
    "collectionViewBlock.deletedCollection.banner.message": "源数据库已删除",
    "collectionViewBlock.noSourcePlaceholder.title": "无数据源",
    "collectionViewBlock.setExternalSource.title": "链接 {integrationName}",
    "collectionViewBlock.setExternalSourceButton.title":
      "<button>链接到 {integrationName}</button> 以继续",
    "collectionViewBlock.setSourceButton.title":
      "<button>选择一个数据源</button>以继续",
    "collectionViewSelect.viewSearch.label": "搜索视图...",
    "collections.operatorValueSelect.placeholder": "选择选项",
    "colors.select.blue": "蓝色",
    "colors.select.brown": "棕色",
    "colors.select.gray": "灰色",
    "colors.select.green": "绿色",
    "colors.select.lightGray": "浅灰色",
    "colors.select.orange": "橙色",
    "colors.select.pink": "粉色",
    "colors.select.purple": "紫色",
    "colors.select.red": "红色",
    "colors.select.yellow": "黄色",
    "comment.actions.addReaction.label": "添加反应",
    "comment.actions.moreActions.label": "编辑、删除、复制链接...",
    "comment.actions.reopenButton.label": "重新开启",
    "comment.actions.resolveButton.label": "解决",
    "comment.confirmDialog.deleteComment.deleteButton.label": "删除",
    "comment.confirmDialog.deleteComment.prompt": "你要删除这条评论吗？",
    "comment.confirmDialog.discardEdit.discardButton.label": "放弃",
    "comment.confirmDialog.discardEdit.prompt": "你要放弃这次编辑吗？",
    "comment.copyLinkToDiscussion.button": "拷贝讨论链接",
    "comment.deleteComment.button": "删除评论",
    "comment.editComment.button": "编辑评论",
    "comment.editedAtTime.label": "{lastEditedTime}（已编辑）",
    "comment.embeddedFile.uploadInProgressMessage": "正在上传文件...",
    "comment.hide": "隐藏页面评论",
    "comment.newIndicator.label": "新评论",
    "comment.reopenDiscussion.button": "重新开启讨论",
    "comment.resolveDiscussion.button": "解决评论",
    "comment.unfurl.attachments.title":
      "{numberOfAttachments, plural, other {{numberOfAttachments} 个附件}}",
    "comment.unfurl.resolvedStatus": "已解决",
    "comments.learn": "了解评论",
    "comments.showLessLabel": "显示更少",
    "configureRelationModal.relationProperty.createModal.databaseSelect.mobile.caption":
      "你希望链接到的数据库。",
    "configureRelationModal.relationProperty.createModal.description":
      "关联关系可以让你从其他数据库中链接页面。",
    "confirmDialogInput.incorrectInputError.message":
      "请输入“{requiredInputValue}”以继续",
    "confirmUnsubscribePage.confirmButton": "取消订阅",
    "confirmUnsubscribePage.errorMessage": "无法取消订阅。",
    "confirmUnsubscribePage.loadingMessage": "载入中…",
    "confirmationInputDialog.cancelButton.label": "取消",
    "confluenceImportErrors.attachmentNotFound.message":
      "无法在 ZIP 归档中找到附件。",
    "confluenceImportErrors.attachmentUploadFailed.message":
      "无法从文件中上传附件。",
    "confluenceImportErrors.bufferUploadFailed.message":
      "无法从缓冲区上传附件。",
    "confluenceImportErrors.failedToBuildPage.message": "无法导入页面。",
    "confluenceImportErrors.failedToExtractZip.message": "无法提取ZIP文件。",
    "confluenceImportErrors.failedToFindElement.message": "无法解析上传。",
    "confluenceImportErrors.foundElementIsIncorrectType.message":
      "无法解析上传。",
    "confluenceImportErrors.indexHtmlMissingAvailablePages.message":
      "无效的索引文件：找不到可用页面。",
    "confluenceImportErrors.noConfluenceIdInPageLink.message":
      "无法从文件名中提取页面 ID。",
    "confluenceImportErrors.noIndexHtmlFile.message":
      "在 ZIP 中找不到索引文件。",
    "confluenceImportErrors.uploadFileSizeExceeded.message":
      "文件不能超过 {maxSize}。",
    "confluenceImportHelpers.subpageHeader": "子页面",
    "confluenceImportHelpers.untitledTableColumn.name": "列",
    "confluenceImportStatus.creatingIndex": "创建索引中…",
    "confluenceImportStatus.downloadingFile": "验证文件中…",
    "confluenceImportStatus.finishingUp": "完成中…",
    "confluenceImportStatus.importingPage":
      "页面导入中…（第{current}个，总共{total}个）",
    "confluenceImportStatus.indexingContent": "正在更新搜寻…",
    "confluenceImportStatus.savingTransactions": "正在保存更改…",
    "confluenceImportStatus.uploadingAttachments": "附件上传中…",
    "connectedAppSettings.deleteExternalAuthorization.confirmDelete.label":
      "是",
    "connectedAppSettings.deleteExternalAuthorization.withAccountName.confirmationMessage":
      "确定要撤销 {accountName} 的访问权限吗？",
    "connectedAppSettings.deleteExternalAuthorization.withoutAccountName.confirmationMessage":
      "确定要撤销此帐户的访问权限吗？",
    "connectedAppSettingsDiscoverItem.connectButton.label": "绑定",
    "connectedAppsSettings.asana.caption": "从看板和列表中导入任务。",
    "connectedAppsSettings.connectedAppsSection.subtitle":
      "管理你与应用的绑定，这些应用可将其他工具的内容引入 Notion。 <helpcenterlink>了解更多。 </helpcenterlink>",
    "connectedAppsSettings.connectedAppsSection.title": "已绑定的应用",
    "connectedAppsSettings.connectionsSection.title": "我的连接",
    "connectedAppsSettings.disconnectGoogleDriveModal.disconnectButton.label":
      "解除绑定",
    "connectedAppsSettings.disconnectGoogleDriveModal.message":
      "解除绑定会禁用所有工作区中嵌入的谷歌云端硬盘文件预览。这不会从 Notion 中删除你的嵌入块，因此你可以随时重新绑定。",
    "connectedAppsSettings.discoverNewAppSection.showAll.label": "全部显示",
    "connectedAppsSettings.discoverNewAppsSection.title": "发现新应用",
    "connectedAppsSettings.evernote.caption": "导入笔记本。",
    "connectedAppsSettings.googleDrive.caption": "查找并嵌入文件。",
    "connectedAppsSettings.helpButton.caption":
      "了解有关在 Notion 中嵌入内容的更多信息。",
    "connectedAppsSettings.offline.message": "请连接网络后管理绑定应用。",
    "connectedAppsSettings.trello.caption": "导入你的看板。",
    "connectedAppsSettingsItem.connectAccountLink": "绑定",
    "connectedAppsSettingsItem.connectAnotherAccountLink": "绑定另一个帐户",
    "connectedAppsSettingsItem.disconnectLink": "解除绑定",
    "connectionErrorIndicator.details.message":
      "自 {sinceSomeTimeAgo} ，保存你的更改时发生错误。稍后我们将重试",
    "connectionErrorIndicator.label.retrying": "似乎出现问题。正在重试…",
    "connectionErrorIndicator.label.retryingInSeconds":
      "似乎出现问题。将在 {numberOfSeconds} 秒后重试…",
    "connectionErrorIndicator.label.shortMessage": "似乎出现问题。",
    "connectionState.errorIndicator.cannotMakeEdits.detailedMessage":
      "你无法继续进行编辑：{errorMessage} {usageInfoMessage}",
    "connectionState.errorIndicator.cannotSaveChanges.message": "无法保存更改…",
    "connectionState.errorIndicator.lowStorageOnDesktopApp.message":
      "磁盘空间不足",
    "connectionState.errorIndicator.lowStorageOnMobileApp.message":
      "应用存储空间不足",
    "connectionState.errorIndicator.lowStorageOnWebApp.message":
      "浏览器存储空间不足",
    "connectionState.errorIndicator.possibleLostEdits.detailedMessagePart1":
      "Notion 正在使用设备上可用存储空间的 {percentageOfStorageBytesUsed}（{totalNumberOfBytes}中的{usedNumberOfBytes}）。",
    "connectionState.errorIndicator.possibleLostEdits.detailedMessagePart2":
      "你可能会丢失离线时所做的更改。尝试关闭并重新打开应用，如果无法解决问题，请与支持人员联系。",
    "connectionState.offlineBadge.label": "离线中",
    "connectionState.offlineBadge.tooltip":
      "{numberOfEdits, plural, other {下一次连接网络时，会自动同步 {numberOfEdits} 个更改。}}",
    "connectionState.savePercentangeIndicator.tooltip": "{percent}完成。",
    "connectionState.saving.message": "保存中…",
    "connectionsSettings.connectionsSection.title": "我的连接",
    "connectionsSettings.discoverNewConnectionsSection.title": "发现新连接",
    "connectionsSettingsLinks.connectionsGallery": "浏览画廊中的连接",
    "connectionsSettingsLinks.helpCenter": "了解有关连接的更多信息",
    "connectionsSettingsLinks.manageConnections": "开发或管理集成",
    "contextual_invite.contextual_invite_failure": "未能邀请 {users} 成为成员",
    "contextual_invite.permission_invite_failure": "未能向 {users} 发送邀请",
    "contextual_invite.permission_invite_success":
      "[仅限本地消息] 成功向 {users} 发送邀请",
    "contextual_invite.permission_invite_success2": "成功向 {users} 发送邀请",
    "contextual_invite.permission_invite_success3": "成功向 {users} 发送邀请",
    "contextual_invite.toast.two_users": "{user1} 和 {user2}",
    "contextual_invite.two_users": "{user1} 及其他 {numOfOtherUsers} 位用户",
    "cookieConsent.acceptAllButton.label": "全部接受",
    "cookieConsent.bannerDisclaimer.message":
      "Notion 使用 cookie 来改善你的体验。有关详细信息，请参阅 <cookielink>Cookie 声明</cookielink>。",
    "cookieConsent.customizeCookies.header": "自定义 cookie",
    "cookieConsent.disclaimer.message":
      "Notion 使用 cookie 为你提供更好的体验。有关详细信息，请参阅<cookielink>Cookie 声明</cookielink>和<privacylink>隐私政策</privacylink> 。",
    "cookieConsent.dismissButton.label": "完成",
    "cookieConsent.moreOptionsButton.label": "更多选项",
    "cookieConsent.reloadAfterSave.message":
      "Notion 将重新加载以使你的 cookie 首选项生效。点击 OK 继续。",
    "cookieConsent.saveError": "无法记录 cookie 同意书，请稍后再试。",
    "cookieConsent.settings.label": "Cookie 设置",
    "cookieConsent.settingsDisclaimer.message":
      "自定义 cookie。有关详细信息，请参阅 <cookielink>Cookie 声明</cookielink>。",
    "cookieConsent.snackbarDisclaimer.message":
      "Notion 使用 cookie。有关详细信息，请参阅 <cookielink>Cookie 声明</cookielink>。",
    "cookieConsent.trackingTypeNecessary.caption":
      "对网站的运作至关重要。始终启用。",
    "cookieConsent.trackingTypeNecessary.title": "绝对必要",
    "cookieConsent.trackingTypePerformance.caption":
      "用于衡量使用情况并改善你的体验。",
    "cookieConsent.trackingTypePerformance.title": "分析",
    "cookieConsent.trackingTypePreference.caption":
      "用于记住首选项并提供增强功能。",
    "cookieConsent.trackingTypePreference.title": "功能性",
    "cookieConsent.trackingTypeTargeting.caption": "用于定向广告。",
    "cookieConsent.trackingTypeTargeting.subtitleiOS":
      "未在 iOS 应用程序中收集或使用",
    "cookieConsent.trackingTypeTargeting.title": "市场营销",
    "cookieConsentSnackbar.description": "Notion 使用 cookie 来改善你的体验。",
    "cookieSelector.captions.necessary": "网站正常运行所必需的。",
    "cookieSelector.captions.performance": "用于改善你的体验。",
    "cookieSelector.captions.preference": "用于记住你所做的首选项。",
    "cookieSelector.captions.targeting": "用于衡量广告效果。",
    "cookieSelector.done.label": "完成",
    "cookieSelector.label.acceptAll": "全都接受",
    "cookieSelector.label.custom": "自定义",
    "cookieSelector.label.customize": "自定义",
    "cookieSelector.select": "自定义 cookie",
    "couponEntryInput.button.apply": "使用",
    "couponEntryInput.error.noPromo": "无效的优惠券代码",
    "couponEntryInput.placeholder": "优惠券代码",
    "createPageMenuItem.title.withPageName": "添加“{filterText}”页面到…",
    "createPageMenuItem.title.withoutPageName": "添加页面到…",
    "createSubpageMenuItem.title.withPageName": "添加“{filterText}”子页面",
    "createSubpageMenuItem.title.withoutPageName": "添加子页面",
    "createTeamFromPage.buttonDisabledTooltip.cannotMovePage":
      "你没有移动此页面的权限",
    "createTeamFromPage.buttonDisabledTooltip.isNotOwner":
      "只有此团队空间的所有者才能从此页面创建新的团队空间",
    "createTeamFromPage.buttonDisabledTooltip.isNotPageBlock":
      "只有页面才能转换为团队空间",
    "createTeamFromPage.buttonDisabledTooltip.privateTeamNonEnterprise":
      "升级到企业版以将其转换为私人团队空间。否则，请增加页面的工作区访问权限，以将其转换为封闭式团队空间。",
    "createTeamFromPage.buttonDisabledTooltip.untitledPage":
      "无法将没有标题的页面转换为团队空间",
    "createTeamFromPage.confirmModal.cancelButton": "取消",
    "createTeamFromPage.confirmModal.confirmButton": "创建团队空间",
    "createTeamFromPage.confirmModal.description":
      "这会将此页面连同已经有权访问此页面的人员一起移动到一个新创建的团队空间中。",
    "createTeamFromPage.confirmModal.learnMore": "了解有关团队空间的更多信息",
    "createTeamFromPage.confirmModal.title": "转换为团队空间？",
    "csatPopup.additionalFeedback.placeholder": "请告诉我们更多…",
    "csatPopup.feedbackPrompt.defaultlabel": "你对使用 Notion 的满意度如何？",
    "csatPopup.feedbackPrompt.docNotesLabel":
      "你对使用 Notion 处理笔记和文档的满意度如何？",
    "csatPopup.feedbackPrompt.enterpriseDefaultLabel":
      "你向朋友推荐 Notion 的可能性有多大？",
    "csatPopup.feedbackPrompt.projManagementLabel":
      "你对在 Notion 中管理项目和任务的满意度如何？",
    "csatPopup.feedbackPrompt.wikiLabel":
      "你对在 Notion 中创建团队知识库的满意度如何？",
    "csatPopup.sendButton.label": "发送",
    "csatPopup.stars.1StarLabel": "非常不满意",
    "csatPopup.stars.1StarLabelNps": "非常不可能",
    "csatPopup.stars.2StarLabel": "有些不满意",
    "csatPopup.stars.2StarLabelNps": "有点不可能",
    "csatPopup.stars.3StarLabel": "不满意也不满足",
    "csatPopup.stars.3StarLabelNps": "不太可能也不太可能",
    "csatPopup.stars.4StarLabel": "还算满意",
    "csatPopup.stars.4StarLabelNps": "有点可能",
    "csatPopup.stars.5StarLabel": "非常满意",
    "csatPopup.stars.5StarLabelNps": "非常可能",
    "csatPopup.stars.notSpecifiedLabel": "选择一项",
    "csatPopup.thanks.description": "你的反馈将帮助我们改善 Notion。",
    "csatPopup.thanks.header": "感谢你的反馈！",
    "customizePageMenu.header.label": "页面视图・用于",
    "customizePageMenu.lock.label": "重新锁定",
    "customizePageMenu.locked.header": "在父级数据库上已锁定设置。",
    "customizePageMenu.mobileHeader.label": "自定义页面",
    "customizePageMenu.pageSections.backlinksTitle": "反向链接",
    "customizePageMenu.pageSections.pageCommentsTitle": "页面评论",
    "customizePageMenu.pageSections.topLevelPageDiscussionsTitle":
      "顶层页面讨论",
    "customizePageMenu.propertiesSection.header": "属性",
    "customizePageMenu.sectionsSection.header": "栏目",
    "customizePageMenu.unlock.label": "解锁",
    "customizePageMenu.unlocked.header": "在父级数据库上已解锁设置。",
    "customizePageMenuVisibilitySelect.collapsed.label": "在弹出窗口中显示",
    "customizePageMenuVisibilitySelect.default.label": "默认",
    "customizePageMenuVisibilitySelect.expanded.label": "展开",
    "customizePageMenuVisibilitySelect.hide.label": "始终隐藏",
    "customizePageMenuVisibilitySelect.hideIfEmpty.label": "空时隐藏",
    "customizePageMenuVisibilitySelect.minimal.label": "最小",
    "customizePageMenuVisibilitySelect.mobile.doneButton.label": "完成",
    "customizePageMenuVisibilitySelect.mobile.title": "选择可见性",
    "customizePageMenuVisibilitySelect.off.label": "关闭",
    "customizePageMenuVisibilitySelect.property.label": "作为属性",
    "customizePageMenuVisibilitySelect.section.label": "作为页面部分",
    "customizePageMenuVisibilitySelect.show.label": "始终显示",
    "database.CollectionSettings.NumberOptions.applyAllViews":
      "更改将应用于显示此属性的所有视图。",
    "database.FirstLoadLimitSelectOption.limitPagesTitle": "{limit} 页",
    "database.actionBar.groupButton.label": "群组",
    "database.actionButton.callTooltip": "货币",
    "database.actionButton.openAsPageTitle": "打开",
    "database.actionButton.openAsPageTooltip": "在页面上打开",
    "database.actionButton.openInSidePeekTooltip": "在侧视图中打开",
    "database.actionButton.openLinkTooltip": "打开链接",
    "database.actionButton.personAddSelfTooltip": "添加本人",
    "database.actionButton.personRemoveSelfTooltip": "移除本人",
    "database.actionButton.personReplaceWithSelfTooltip": "与本人替换",
    "database.actionButton.sendEmailTooltip": "发送电子邮件",
    "database.actionMenu.fileProperty.delete.title": "删除",
    "database.actionMenu.fileProperty.download.title": "下载",
    "database.actionMenu.fileProperty.fullscreen.title": "全屏",
    "database.actionMenu.fileProperty.rename.title": "重命名",
    "database.actionMenu.fileProperty.viewOriginal.title": "查看原始内容",
    "database.addNewProperty.pageProperty.defaultNamePrefix": "属性",
    "database.addNewProperty.property.defaultNamePrefix": "属性",
    "database.aggregationDescription.average": "计算数值属性的平均值。",
    "database.aggregationDescription.checked": "对此属性选中的页面进行计数。",
    "database.aggregationDescription.count":
      "对全部页面进行计数，包括空白页面。",
    "database.aggregationDescription.count_per_group":
      "计算具有此状态群组的页面总数。",
    "database.aggregationDescription.count_values":
      "计算此属性的非空值的数量。对于可以包含多个值的类型（例如多选或人员），这将计算每个页面的选定值数。",
    "database.aggregationDescription.date_range":
      "计算日期属性的日期范围（最晚日期减最早日期）。",
    "database.aggregationDescription.earliest_date": "寻找日期属性的最早日期。",
    "database.aggregationDescription.empty": "对此属性为空值的页面进行计数。",
    "database.aggregationDescription.latest_date": "寻找日期属性的最晚日期。",
    "database.aggregationDescription.max": "寻找数字属性的最大值。",
    "database.aggregationDescription.median": "寻找数字属性的中位数。",
    "database.aggregationDescription.min": "寻找数值属性的最小值。",
    "database.aggregationDescription.not_empty":
      "对此属性为非空值的页面进行计数。",
    "database.aggregationDescription.percent_checked":
      "显示此属性已选页面的百分比。",
    "database.aggregationDescription.percent_empty":
      "显示此属性为空值的页面的百分比。",
    "database.aggregationDescription.percent_not_empty":
      "显示此属性为非空值的页面的百分比。",
    "database.aggregationDescription.percent_per_group":
      "显示具有此状态群组的页面的百分比",
    "database.aggregationDescription.percent_unchecked":
      "显示此属性未选页面的百分比。",
    "database.aggregationDescription.range":
      "计算数字属性的范围（最大值减最小值）。",
    "database.aggregationDescription.show_unique":
      "显示此属性的唯一值。对于可以包含多个值（例如多选或人员）的属性类型，将计算所有页面中的唯一值。",
    "database.aggregationDescription.sum": "计算数字属性的总和。",
    "database.aggregationDescription.unchecked": "对此属性未选的页面进行计数。",
    "database.aggregationDescription.unique":
      "计算此属性的唯一值的数量。对于可以包含多个值（例如多选或个人）的类型，这将计算所有页面上的唯一值。",
    "database.aggregationFullName.average": "平均数",
    "database.aggregationFullName.checked": "选中",
    "database.aggregationFullName.count": "总数",
    "database.aggregationFullName.count_per_group": "每个群组总数",
    "database.aggregationFullName.count_values": "值的总数",
    "database.aggregationFullName.date_range": "日期范围",
    "database.aggregationFullName.earliest_date": "最早日期",
    "database.aggregationFullName.empty": "空单元格总数",
    "database.aggregationFullName.latest_date": "最晚日期",
    "database.aggregationFullName.max": "最大值",
    "database.aggregationFullName.median": "中位数",
    "database.aggregationFullName.min": "最小值",
    "database.aggregationFullName.not_empty": "非空单元格总数",
    "database.aggregationFullName.percent_checked": "选中百分比",
    "database.aggregationFullName.percent_empty": "空单元格百分比",
    "database.aggregationFullName.percent_not_empty": "非空单元格百分比",
    "database.aggregationFullName.percent_per_group": "每个群组百分比",
    "database.aggregationFullName.percent_unchecked": "未选百分比",
    "database.aggregationFullName.range": "范围",
    "database.aggregationFullName.sum": "总和",
    "database.aggregationFullName.unchecked": "未选",
    "database.aggregationFullName.unique": "唯一值的总数",
    "database.aggregationFullName.unique_values": "显示唯一值",
    "database.aggregationShortName.average": "平均",
    "database.aggregationShortName.checked": "选中",
    "database.aggregationShortName.count": "计数",
    "database.aggregationShortName.count_per_group": "总数",
    "database.aggregationShortName.count_values": "值",
    "database.aggregationShortName.date_range": "范围",
    "database.aggregationShortName.earliest_date": "最早",
    "database.aggregationShortName.empty": "空",
    "database.aggregationShortName.latest_date": "最晚",
    "database.aggregationShortName.max": "最大",
    "database.aggregationShortName.median": "中位",
    "database.aggregationShortName.min": "最小",
    "database.aggregationShortName.not_empty": "非空",
    "database.aggregationShortName.percent_checked": "选中",
    "database.aggregationShortName.percent_empty": "空",
    "database.aggregationShortName.percent_not_empty": "非空",
    "database.aggregationShortName.percent_per_group": "百分比",
    "database.aggregationShortName.percent_unchecked": "未选",
    "database.aggregationShortName.range": "范围",
    "database.aggregationShortName.showUnique": "显示唯一",
    "database.aggregationShortName.sum": "总和",
    "database.aggregationShortName.unchecked": "未选",
    "database.aggregationShortName.unique": "唯一",
    "database.boardAggregation.tooltip": "汇总",
    "database.boardView.actions.addNewPage.tooltip": "创建新页面",
    "database.boardView.addGroupButtonTitle": "添加分组",
    "database.boardView.addItemButtonTitle": "新建",
    "database.boardView.missingSelectProperty":
      "无法呈现此视图，因为数据库缺少选择属性。",
    "database.boardView.searchResults.noResults.label": "无结果",
    "database.boardView.uncategorizedColumnTitle": "无{name}",
    "database.boardView.uncategorizedColumnTooltip":
      "任何<b>{name}</b>属性为空的项目都将移到此处。此分组无法删除。",
    "database.calendarView.addItemButtonTooltip": "添加项目",
    "database.calendarView.dateProperty.defaultName": "日期",
    "database.calendarView.missingDateProperty":
      "无法呈现此视图，因为数据库缺少日期属性。",
    "database.calendarView.todayButton.label": "今天",
    "database.collectionEditGroupMenu.newGroupLabel.placeholder": "新建群组",
    "database.collectionEditGroupMenu.renameGroupLabel.placeholder":
      "重命名群组",
    "database.collectionEditGroupMenu.submitButton.label": "完成",
    "database.collectionEditViewButtonPopup.dateNameProperty": "日期",
    "database.collectionEditViewButtonPopup.renameButtonTitle": "重命名",
    "database.collectionEditViewButtonPopup.statusNameProperty": "状态",
    "database.collectionGroupActionMenu.colorSectionTitle": "颜色",
    "database.collectionGroupActionMenu.deleteButtonTitle": "删除",
    "database.collectionGroupActionMenu.deleteDialogMessage":
      "是否确定？该群组内的所有块都将被删除。",
    "database.collectionGroupActionMenu.hideButtonTitle": "隐藏",
    "database.collectionGroupActionMenu.showButtonTitle": "显示",
    "database.collectionGroupActionMenu.title": "动作",
    "database.collectionGroupAggregation.title": "聚合",
    "database.collectionGroupHeader.actions.addNewPage.tooltip": "创建新页面",
    "database.collectionGroupValue.dateGroup.last7Days": "过去 7 天",
    "database.collectionGroupValue.dateGroup.last_30Days": "过去 30 天",
    "database.collectionGroupValue.dateGroup.next30Days": "未来 30 天",
    "database.collectionGroupValue.dateGroup.next7Days": "未来 7 天",
    "database.collectionGroupValue.dateGroup.today": "今天",
    "database.collectionGroupValue.dateGroup.tomorrow": "明天",
    "database.collectionGroupValue.dateGroup.week.differingStartAndEndMonth":
      "{startYear}{startMonth} {startDay} - {endMonth} {endDay} 当周",
    "database.collectionGroupValue.dateGroup.week.differingStartAndEndYear":
      "{startYear}{startMonth} {startDay}  -{endYear}  {endMonth} {endDay} 当周",
    "database.collectionGroupValue.dateGroup.week.sameStartAndEndMonth":
      "{startYear}{startMonth} {startDay}-{endDay} 当周",
    "database.collectionGroupValue.dateGroup.yesterday": "昨天",
    "database.collectionGroupValue.numberGroup.outOfRange": "超出范围",
    "database.collectionGroupValue.numberGroup.range": "{start} 到 {end}",
    "database.collectionGroupValue.textGroup.other": "其他",
    "database.collectionTemplatePickerItem.actionMenu.setAsDefault": "设为默认",
    "database.collectionTemplatePickerItem.setAsDefaultDialog.message":
      "<span>创建新页面时将 &ldquo;{pageName}&rdquo; 用作默认模板？</span>",
    "database.collectionTemplatePickerItem.setAsDefaultDialog.setCollection":
      "对于 &ldquo;{databaseName}&rdquo; 中的所有视图",
    "database.collectionTemplatePickerItem.setAsDefaultDialog.setCollectionView":
      "仅在 &ldquo;{viewName}&rdquo; 视图上",
    "database.collectionView.untitledName.board": "看板",
    "database.collectionView.untitledName.calendar": "日历",
    "database.collectionView.untitledName.gallery": "画廊",
    "database.collectionView.untitledName.list": "列表",
    "database.collectionView.untitledName.table": "表格",
    "database.collectionView.untitledName.timeline": "时间轴",
    "database.collectionViewBlock.openFullscreenPageButton.tooltip":
      "以整页形式打开",
    "database.collectionViewBlock.openViewSettingsButton.tooltip":
      "编辑视图布局、分组等…",
    "database.collectionViewSelect.addViewButtonTitle": "添加视图",
    "database.collectionViewSelect.noResultsTitle": "无结果",
    "database.configureProperty.duplicateAction": "创建属性副本",
    "database.configureProperty.hideAction": "隐藏属性",
    "database.configureProperty.showAsAction": "显示为",
    "database.confirmDialog.templatePickerItem.deleteButton.label": "删除",
    "database.confirmDialog.templatePickerItem.deleteMessage":
      "确定要删除此模板吗？",
    "database.copyButton.copyToClipboard": "复制到剪贴板",
    "database.editButton.configureRollupTooltip": "配置汇总",
    "database.editButton.editEmailTooltip": "编辑邮箱地址",
    "database.editButton.editLinkTooltip": "编辑URL",
    "database.editButton.editPhoneTooltip": "编辑电话号码",
    "database.editProperty.databaseLocked.tooltipPart1": "页面属性已锁定",
    "database.editProperty.databaseLocked.tooltipPart2":
      "请前往{recordIconAndTitle}解锁",
    "database.editProperty.errorDialog.duplicateSelectValue.message":
      "此选择项已经存在。",
    "database.editProperty.errorDialog.forbidDeleteDefaultOption.message":
      "无法删除默认选项。",
    "database.editProperty.errorDialog.missingSelectValue.message":
      "请输入一个值。",
    "database.editProperty.select.mobileLabel": "重命名",
    "database.editProperty.setAsDefault.confirm.continueButton": "继续",
    "database.editProperty.setAsDefault.confirm.description":
      "新页面将以 {defaultValue} 作为默认状态启动。<b>未设置状态</b>的现有页面将切换到 {defaultValue}。",
    "database.editProperty.setAsDefault.confirm.title":
      "将默认值更改为 <b>{defaultValue}</b>？",
    "database.emptyTemplatesList.info": "使用模板来复用此数据库中的页面格式。",
    "database.fileProperty.focusedLabel": "添加文件或图片",
    "database.fileProperty.mobileMenu.title": "文件属性",
    "database.filterAndSort.datePropertyValue.placeholder": "选择日期",
    "database.filterAndSort.dateRangePropertyValue.placeholder": "选择范围",
    "database.filterAndSort.firstPersonPropertyValue.title": "我自己",
    "database.filterAndSort.mobileEditButton.label": "编辑",
    "database.filterAndSort.propertyValueInput.placeholder": "值",
    "database.filterAndSortMenu.propertyButton.label": "属性",
    "database.filterBar.addButton.title": "添加筛选器",
    "database.filterBar.advancedFilterRulesCount.title":
      "{ruleCount, plural, other {{ruleCount} 条规则}}",
    "database.filterBar.changesControl.mergeIntoAdvancedFilter.title":
      "合并到高级筛选器中",
    "database.filterBar.changesControl.reset.title": "重置",
    "database.filterBar.changesControl.saveAsNewView.title": "另存为新视图",
    "database.filterBar.changesControl.saveForEveryone.title": "为所有人保存",
    "database.filterBar.doubleClickToEdit.title": "双击进行编辑",
    "database.filterBar.filter.title": "筛选器",
    "database.filterBar.mobileSearch.placeholder": "输入以搜索…",
    "database.filterBar.reset.title": "重置",
    "database.filterBar.saved.title": "为所有人保存的更改。",
    "database.filterBar.search.title": "搜索",
    "database.filterBar.sorts.label": "{sortCount} 个排序",
    "database.filterBar.tooltipPreview.empty.title": "清空筛选器",
    "database.filterBar.tooltipPreview.moreAdditionalRules.title":
      "{ruleCount, plural, other {{ruleCount} 条筛选器规则}}",
    "database.filterBar.turnOffFilter.title": "点击可自行关闭此筛选器",
    "database.filterBar.turnOnFilter.title": "点击可自行启用此筛选器",
    "database.filterBar.undo.title": "撤销",
    "database.filterBar.updateFilter.title": "点击可自行更新此筛选器",
    "database.filterBarFilterValue.notOperator": "不是",
    "database.filterBarFilterValue.title":
      "{propertyName}{colonSeparator} {filterOperator} {propertyValue}",
    "database.filterMenu.addFilterGroup2ButtonTitle": "添加筛选器组",
    "database.filterMenu.addFilterGroupButtonCaption": "一个组可包含多个筛选器",
    "database.filterMenu.addFilterGroupButtonTitle": "添加筛选器组",
    "database.filterMenu.addFilterRuleButtonTitle": "添加筛选器规则",
    "database.filterMenu.comparatorMenuDropdownButton.label": "比较器",
    "database.filterMenu.dateSelectMenu.emptyPlaceholder": "空",
    "database.filterMenu.duplicateFilterGroupMenuTitle": "创建副本",
    "database.filterMenu.duplicateFilterMenuTitle": "创建副本",
    "database.filterMenu.filterGroupIndex": "筛选器组 {index}",
    "database.filterMenu.filterIndex": "筛选 {index}",
    "database.filterMenu.filterOperatorMenu.title": "运算符",
    "database.filterMenu.mobileComparatorValueMenu.title": "比较器",
    "database.filterMenu.mobileDateSelectMenu.title": "日期",
    "database.filterMenu.mobileMenuTitle": "筛选器",
    "database.filterMenu.operatorPlaceholder": "运算符",
    "database.filterMenu.removeFilterGroupMenuTitle": "移除",
    "database.filterMenu.removeFilterMenuTitle": "移除",
    "database.filterMenu.rollupPropertyValue.mobileMenu.title": "设置筛选器",
    "database.filterMenu.turnIntoFilterMenuTitle": "转换成筛选器",
    "database.filterMenu.turnIntoGroupMenuTitle": "转换成组",
    "database.filterMenu.unwrapGroupMenuTitle": "展开组",
    "database.filterMenu.where": "当",
    "database.filterMenu.wrapInGroupMenuCaption": "围绕此项创建筛选器组",
    "database.filterMenu.wrapInGroupMenuTitle": "包装成组",
    "database.filterOperatorValue.askForInput": "请求输入",
    "database.filterOperatorValue.checkboxPlaceholder.title": "选择一个值",
    "database.filterOperators.and": "与",
    "database.filterOperators.andCaption": "必须满足所有筛选规则",
    "database.filterOperators.any": "的任何值",
    "database.filterOperators.every": "的每个值",
    "database.filterOperators.none": "没有值",
    "database.filterOperators.or": "或",
    "database.filterOperators.orCaption": "必须满足至少一个筛选规则",
    "database.filterValue.checkboxType.checked.title": "选中",
    "database.filterValue.checkboxType.title": "复选框",
    "database.filterValue.checkboxType.unchecked.title": "未选中",
    "database.filterValue.clear.message": "清除",
    "database.filterValue.commaSeparator": ",",
    "database.filterValue.dateType.dateIsAfter.title": "之后",
    "database.filterValue.dateType.dateIsBefore.title": "之前",
    "database.filterValue.dateType.dateIsOnOrAfter.title": "当日或之后",
    "database.filterValue.dateType.dateIsOnOrBefore.title": "当日或之前",
    "database.filterValue.dateType.ending.title": "结束",
    "database.filterValue.dateType.starting.title": "开始",
    "database.filterValue.dateType.title": "日期",
    "database.filterValue.deleteFilter.title": "删除筛选器",
    "database.filterValue.mergeIntoAdvancedFilter.title": "合并到高级筛选器中",
    "database.filterValue.mergeIntoAdvancedFilter.tooltip":
      "使用高级筛选器对筛选器规则进行分组并使用 AND/OR 条件。",
    "database.filterValue.numberType.searchPlaceholder": "输入一个值…",
    "database.filterValue.numberType.title": "数字",
    "database.filterValue.personType.firstPersonPropertyValue.title": "我",
    "database.filterValue.personType.noResults.message": "无结果",
    "database.filterValue.personType.searchPersonPropertyMenuItem.errorMessage":
      "出了些问题。",
    "database.filterValue.personType.searchPlaceholder":
      "搜索一个或多个人员...",
    "database.filterValue.personType.title": "人员",
    "database.filterValue.relationType.searchPlaceholder":
      "搜索一个或多个页面...",
    "database.filterValue.relationType.title": "关联关系",
    "database.filterValue.selectType.clearSelection.message": "清除选择",
    "database.filterValue.selectType.noResults.message": "无结果",
    "database.filterValue.selectType.prompt": "选择选项",
    "database.filterValue.selectType.searchPlaceholder":
      "选择一个或多个选项...",
    "database.filterValue.selectType.title": "选择",
    "database.filterValue.textType.searchPlaceholder": "输入一个值…",
    "database.filterValue.textType.title": "文本",
    "database.firstLoadLimitSelectMenu.firstLoadLimitSetting":
      "在首次加载时显示",
    "database.formula.acceptFormulaInput.tooltip": "接受",
    "database.formula.category.constants": "常数",
    "database.formula.category.functions": "函数",
    "database.formula.category.operators": "运算符",
    "database.formula.category.properties": "属性",
    "database.formula.constant.e.description": "自然对数的底数。",
    "database.formula.constant.pi.description": "圆周长与其直径之比。",
    "database.formula.doneButton.label": "完成",
    "database.formula.examplesSection.title": "例子",
    "database.formula.function.abs.description": "返回数字的绝对值。",
    "database.formula.function.cbrt.description": "返回数字的立方根。",
    "database.formula.function.ceil.description":
      "返回大于或等于数字的最小整数。",
    "database.formula.function.concat.description": "将参数拼接并返回结果。",
    "database.formula.function.contains.description":
      "如果在第一个参数中找到第二个参数，则返回 true。",
    "database.formula.function.date.description":
      "返回一个介于 1 到 31 之间的整数，对应于给定月份中的日期数。",
    "database.formula.function.dateAdd.description":
      '添加时间到日期。最后一个参数“单位”可以是以下选项（英文）："quarters", "months", "weeks", "days", "hours", "minutes", "seconds" 或 "milliseconds"。',
    "database.formula.function.dateBetween.description":
      '返回两个日期之间的时间。最后一个参数“单位”可以是以下选项（英文）："quarters", "months", "weeks", "days", "hours", "minutes", "seconds" 或 "milliseconds"。',
    "database.formula.function.dateSubtract.description":
      '从日期减去时间。最后一个参数“单位”可以是以下选项（英文）："quarters", "months", "weeks", "days", "hours", "minutes", "seconds" 或 "milliseconds"。',
    "database.formula.function.day.description":
      "返回与给定日期的星期几相对应的整数：0 代表星期日，1 代表星期一，2 代表星期二，依此类推。",
    "database.formula.function.empty.description": "测试值是否为空。",
    "database.formula.function.end.description": "返回日期范围的结束。",
    "database.formula.function.exp.description":
      "返回 E^x，其中 x 是参数，E 是欧拉常数（2.718…），即自然对数的底数。",
    "database.formula.function.floor.description":
      "返回小于或等于数字的最大整数。",
    "database.formula.function.format.description": "将其参数格式化为字符串。",
    "database.formula.function.formatDate.description":
      "使用 Moment.js 的时间格式字符串来格式化日期。",
    "database.formula.function.fromTimestamp.description":
      "返回从 Unix 毫秒时间戳构建的日期，对应于自1970年1月1日起的毫秒数。",
    "database.formula.function.hour.description":
      "返回一个介于 0 和 23 之间的整數，对应于给定日期中的小时数。",
    "database.formula.function.id.description": "返回每个条目的唯一字符串ID。",
    "database.formula.function.join.description":
      "以第一个参数为连接符，将数组中所有元素拼接为一个字符串。",
    "database.formula.function.length.description": "返回字符串的长度。",
    "database.formula.function.ln.description": "返回数字的自然对数。",
    "database.formula.function.log10.description":
      "返回数字的以 10 为底的对数。",
    "database.formula.function.log2.description": "返回数字的以 2 为底的对数。",
    "database.formula.function.max.description":
      "返回零个或多个数字中的最大值。",
    "database.formula.function.min.description":
      "返回零个或多个数字中的最小值。",
    "database.formula.function.minute.description":
      "返回一个介于 0 和 59 之间的整数，对应于给定日期中的分钟数。",
    "database.formula.function.month.description":
      "根据本地时间，返回一个介于 0 和 11 之间的整数，对应于给定日期中的月份。0 对应于一月，1 对应于二月，依此类推。",
    "database.formula.function.now.description": "返回当前日期和时间。",
    "database.formula.function.replace.description":
      "用新值替换正则表达式的第一个匹配项。",
    "database.formula.function.replaceAll.description":
      "用新值替换正则表达式的所有匹配项。",
    "database.formula.function.round.description":
      "返回四舍五入到最接近整数的数字的值。",
    "database.formula.function.sign.description":
      "返回 x 的符号，指示 x 是正数、负数还是零。",
    "database.formula.function.slice.description":
      "从起始索引（包含）到结束索引（可选，不包含）的提取字符串中的子字符串。",
    "database.formula.function.sqrt.description": "返回数字的正平方根。",
    "database.formula.function.start.description": "返回日期范围的开始。",
    "database.formula.function.test.description":
      "测试字符串是否与正则表达式匹配。",
    "database.formula.function.timestamp.description":
      "返回 Unix 毫秒时间戳的整数，对应于自1970年1月1日起的毫秒数。",
    "database.formula.function.toNumber.description": "从文本中解析数字。",
    "database.formula.function.year.description":
      "返回与给定日期的年份相对应的数字。",
    "database.formula.keyboardShortcutHint": "{commandEnter} 以接受",
    "database.formula.mobileNoErrors.message": "没有错误。",
    "database.formula.operator.add.description":
      "将两个数字相加并返回其总和，或者将两个字符串拼接起来。",
    "database.formula.operator.and.description":
      "返回其两个参数的逻辑与（AND）。",
    "database.formula.operator.divide.description":
      "将两个数字相除并返回其商。",
    "database.formula.operator.equal.description":
      "如果参数相等，则返回 true，否则返回 false。",
    "database.formula.operator.if.description":
      "基于另一个值在两个选项之间切换。",
    "database.formula.operator.larger.description":
      "如果第一个参数大于第二个参数，则返回 true。",
    "database.formula.operator.largerEq.description":
      "如果第一个参数大于或等于第二个参数，则返回 true。",
    "database.formula.operator.mod.description": "将两个数字相除并返回其余数。",
    "database.formula.operator.multiply.description":
      "将两个数字相乘并返回其乘积。",
    "database.formula.operator.not.description": "返回其参数的逻辑非（NOT）。",
    "database.formula.operator.or.description":
      "返回其两个参数的逻辑或（OR）。",
    "database.formula.operator.pow.description":
      "返回底数（base）的指数（exponent）次幂，即 baseexponent。",
    "database.formula.operator.smaller.description":
      "如果第一个参数小于第二个参数，则返回 true。",
    "database.formula.operator.smallerEq.description":
      "如果第一个参数小于或等于第二个参数，则返回 true。",
    "database.formula.operator.subtract.description":
      "将两个数字相减并返回其差值。",
    "database.formula.operator.unaryMinus.description": "数字的负数。",
    "database.formula.operator.unaryPlus.description": "将其参数转换为数字。",
    "database.formula.operator.unequal.description":
      "如果参数相等，则返回 false，否则返回 true。",
    "database.formula.placeholder": "输入一个函数",
    "database.formula.property.description":
      "返回每个条目的{propertyName}属性。",
    "database.formula.syntaxSection.title": "语法",
    "database.formulaPropertyEntryMenuItem.title": "文档",
    "database.galleryView.addItemButtonTitle": "新建",
    "database.genericColumn.name": "列 {columnNumber}",
    "database.groupExistsAlreadyError.message": "群组已存在。",
    "database.groupMenu.clear": "清除",
    "database.groupMenu.columnsBy": "列依据",
    "database.groupMenu.dateGroupBy.day": "日",
    "database.groupMenu.dateGroupBy.month": "月",
    "database.groupMenu.dateGroupBy.relative": "相对",
    "database.groupMenu.dateGroupBy.week": "周",
    "database.groupMenu.dateGroupBy.year": "年",
    "database.groupMenu.groupBy": "分组方式",
    "database.groupMenu.hiddenGroups": "隐藏群组",
    "database.groupMenu.hideAllGroups": "全部隐藏",
    "database.groupMenu.loadMoreButton.text":
      "{database.groupMenu.loadMoreButton.text, plural, other {显示另外 {loadMoreAmount, plural, one {{loadMoreAmount} 个群组} other {{loadMoreAmount} 个群组}}}}",
    "database.groupMenu.numberGroupBy.range": "{start} 到 {end}",
    "database.groupMenu.numberGroupRange": "群组范围",
    "database.groupMenu.numberGroupSize": "分组间隔",
    "database.groupMenu.showAllGroups": "全部显示",
    "database.groupMenu.statusGroupBy.group": "分组",
    "database.groupMenu.statusGroupBy.option": "选项",
    "database.groupMenu.textGroupBy.alphabetical": "按字母顺序",
    "database.groupMenu.textGroupBy.exact": "精确",
    "database.groupMenu.visibleGroups": "可见群体",
    "database.groups.loadMoreButton.text":
      "{database.groups.loadMoreButton.text, plural, other {另外 {loadMoreAmount} 个}}",
    "database.listView.addItemButtonTitle": "新建",
    "database.loadMoreButtonTitle": "加载更多",
    "database.mobileBoardAggregationMenu.title": "表汇总",
    "database.mobileFilterAndSortMenu.property.buttonMenuItem.label": "属性",
    "database.mobileFormulaModal.saveButton.label": "保存",
    "database.mobileFormulaModal.title": "函数",
    "database.mobilePropertyAggregationMenu.title": "表汇总",
    "database.mobileSearch.placeholder": "输入以搜索…",
    "database.mobileSelectViewMenu.title":
      "{numberOfViews, plural, one {{numberOfViews} 个视图} other {{numberOfViews} 个视图}}",
    "database.mobileTemplatesMenu.title": "数据库模板",
    "database.navigateButton.openAsPageTitle": "打开",
    "database.navigateButton.openInSidePeekTooltip": "侧面打开",
    "database.noPersonSearchResults.message": "无结果",
    "database.noRelationSearchResults.message": "无结果",
    "database.optionExistsAlreadyError.message": "选项已存在。",
    "database.pageProperties.addPropertyButtonTitle": "添加属性",
    "database.pageProperties.hidePropertyTitle":
      "{num, plural, other {隐藏 {num} 个属性}}",
    "database.pageProperties.showMorePropertyTitle":
      "{num, plural, other {其他 {num} 个属性}}",
    "database.pageProperty.emptyTitle": "空",
    "database.personPropertyMenu.noSearchResults.message": "无结果",
    "database.personPropertyMenu.searchErrorMessage": "出了些问题。",
    "database.personPropertyValue.searchPlaceholder": "搜索人员…",
    "database.personPropertyValue.selectPerson.searchPlaceholder":
      "选择一个或多个人员",
    "database.personPropertyValue.selectPerson.searchPlaceholderWithLimit":
      "选择人员",
    "database.propertyAggregationMenu.noneText": "无",
    "database.propertyTypeDescription.checkbox": "通过复选框追踪状态。",
    "database.propertyTypeDescription.created_by": "引用创建页面的人员。",
    "database.propertyTypeDescription.created_time":
      "引用页面的创建日期和时间。",
    "database.propertyTypeDescription.date":
      "一个日期，带有格式化选项，可包含时间。",
    "database.propertyTypeDescription.email": "引用邮箱地址。",
    "database.propertyTypeDescription.file": "上传文件和图片。",
    "database.propertyTypeDescription.formula": "使用页面的其他属性计算函数。",
    "database.propertyTypeDescription.last_edited_by":
      "引用上次编辑页面的人员。",
    "database.propertyTypeDescription.last_edited_time":
      "引用页面的上次编辑日期和时间。",
    "database.propertyTypeDescription.multi_select":
      "使用选项列表中的值进行标记。",
    "database.propertyTypeDescription.number":
      "一个数字，可以格式化为货币、百分比等选项。",
    "database.propertyTypeDescription.person": "引用你团队中的人员。",
    "database.propertyTypeDescription.phone_number": "引用电话号码。",
    "database.propertyTypeDescription.relation":
      "允许此数据库中的页面引用另一个数据库中的页面。",
    "database.propertyTypeDescription.rollup": "显示并汇总关联关系中的数据。",
    "database.propertyTypeDescription.select": "从选项列表中选择。",
    "database.propertyTypeDescription.status": "带有组自定义选项列表的标签",
    "database.propertyTypeDescription.text": "一行文字。",
    "database.propertyTypeDescription.url": "网络上的链接。",
    "database.propertyTypeName.checkbox": "复选框",
    "database.propertyTypeName.created_by": "创建者",
    "database.propertyTypeName.created_time": "创建时间",
    "database.propertyTypeName.date": "日期",
    "database.propertyTypeName.email": "电子邮件",
    "database.propertyTypeName.file": "文件和媒体",
    "database.propertyTypeName.formula": "函数",
    "database.propertyTypeName.last_edited_by": "上次编辑者",
    "database.propertyTypeName.last_edited_time": "上次编辑时间",
    "database.propertyTypeName.multi_select": "多选",
    "database.propertyTypeName.number": "数字",
    "database.propertyTypeName.person": "人员",
    "database.propertyTypeName.phone_number": "电话",
    "database.propertyTypeName.relation": "关联关系",
    "database.propertyTypeName.rollup": "汇总",
    "database.propertyTypeName.select": "单选",
    "database.propertyTypeName.status": "状态",
    "database.propertyTypeName.text": "文本",
    "database.propertyTypeName.title": "标题",
    "database.propertyTypeName.url": "网址",
    "database.propertyValues.mobileFormulaMenu.title": "函数",
    "database.relationMenu.hiddenInRelationTitle": "在相关数据库中隐藏",
    "database.relationMenu.noProperties": "无属性",
    "database.relationMenu.shownInRelationTitle": "在相关数据库中显示",
    "database.relationMenuRow.tooltip.addPage.message": "链接页面",
    "database.relationMenuRow.tooltip.insertPage.message": "链接另一个页面",
    "database.relationMenuRow.tooltip.openPage.message": "在页面上打开",
    "database.relationMenuRow.tooltip.removePage.message": "移除页面",
    "database.relationProperty.emptyState.addNew": "新建页面",
    "database.relationProperty.emptyState.label":
      "在 {databaseWithIcon} 中找不到任何页面",
    "database.relationProperty.newRelation.targetDatabase":
      "<regular>在</regular> {databaseWithIcon}<regular>中</regular>",
    "database.relationProperty.noResults.subHeader": "无结果",
    "database.relationProperty.relatedPages.limit.subHeader": "链接的页面",
    "database.relationProperty.relatedPages.subHeader":
      "{count, plural, other {{count} 个链接的页面}}",
    "database.relationProperty.unrelatedPages.anotherPage.subHeader":
      "链接另一个页面",
    "database.relationProperty.unrelatedPages.subHeader":
      "{database.relationProperty.unrelatedPages.subHeader, plural, other {选择页面}}",
    "database.relationPropertyMenu.tooltip.addPage.message": "添加到关联",
    "database.relationPropertyMenu.tooltip.addPage.prompt": "输入",
    "database.relationPropertyMenu.tooltip.removePage.message": "移除页面",
    "database.relationPropertyValue.moreItems.message":
      "其他 {relationMoreItemsCount} 项…",
    "database.restoredProperty.name": "{propertyName}（已恢复）",
    "database.rollupProperty.aggregate.showOriginal": "显示原始值",
    "database.rollupProperty.editAggregate.title": "计算",
    "database.rollupProperty.editAggregate.tooltip":
      "先选择现有的关联关系和属性。",
    "database.rollupProperty.editProperty.buttonTitle": "选择要显示的属性…",
    "database.rollupProperty.editProperty.title": "属性",
    "database.rollupProperty.editProperty.tooltip": "请先选择现有的关联关系。",
    "database.rollupProperty.editRelation.buttonTitle": "选择现有关联关系…",
    "database.rollupProperty.editRelation.title": "关联关系",
    "database.searchInputPlaceholder": "输入以搜索…",
    "database.searchPerson.placeholder": "搜索人员…",
    "database.searchRelation.createNewPageFooter":
      "在 {databaseNameWithIcon} 中<medium>新建</medium> {pageName} <medium>页面</medium>",
    "database.searchRelation.placeholder": "搜索页面...",
    "database.selectPropertyEditMenu.createLabel": "创建",
    "database.selectPropertyEditMenu.noResults": "未找到任何选项",
    "database.selectPropertyEditMenu.searchPlaceholder": "搜索选项…",
    "database.selectPropertyEditMenu.searchStatusPlaceholder": "搜索选项",
    "database.selectPropertyEditMenu.selectOnlyPrompt": "选择选项",
    "database.selectPropertyEditMenu.selectOrCreatePrompt":
      "选择或创建一个选项",
    "database.selectPropertyOptionEditMenu.Group": "分组",
    "database.selectPropertyOptionEditMenu.colorsSection": "颜色",
    "database.selectPropertyOptionEditMenu.deleteLabel": "删除",
    "database.selectPropertyOptionEditMenu.deleteModal.confirmButton": "移除",
    "database.selectPropertyOptionEditMenu.deleteModal.prompt":
      "确定要移除此选项？",
    "database.selectPropertyOptionEditMenu.setAsDefault": "设为默认",
    "database.sortMenu.addSortButtonTitle": "添加排序",
    "database.sortMenu.deleteButtonTooltip": "删除排序规则",
    "database.source.editTitle.title": "编辑数据库标题",
    "database.source.hideTitle.title": "隐藏数据库标题",
    "database.source.titlePlaceholder": "无标题",
    "database.source.viewDatabase.title": "查看数据库",
    "database.statusProperty.groupName.complete": "已完成",
    "database.statusProperty.groupName.inProgress": "进行中",
    "database.statusProperty.groupName.todo": "待办",
    "database.tableHeaderCell.deleteProperty": "删除属性",
    "database.tableHeaderCell.deleteProperty.modal.inverseConfirmButton":
      "删除，但保留相关属性",
    "database.tableHeaderCell.deleteProperty.modal.prompt":
      "注意：此属性在{relationTargetName}上有一个相关属性，该属性也将被删除。",
    "database.tableHeaderCell.editProperty": "编辑属性",
    "database.tableHeaderCell.editPropertyTooltip":
      "编辑属性名称、类型和其他选项...",
    "database.tableHeaderCell.filter": "筛选器",
    "database.tableHeaderCell.hideFromView": "从视图中隐藏",
    "database.tableHeaderCell.hideInView": "在视图中隐藏",
    "database.tableHeaderCell.rename": "重命名",
    "database.tableHeaderCell.sortAscending": "升序排列",
    "database.tableHeaderCell.sortDescending": "降序排列",
    "database.tableHeaderCell.wrapColumn": "列换行",
    "database.tableView.addRowButton": "新建",
    "database.tableView.aggregationPlaceholder": "计算",
    "database.tableView.emptyTablePlaceholder": "此表内容为空。",
    "database.tableView.emptyTablePlaceholderWithFilters":
      "没有结果。点击以添加新的页面，或重置筛选器。",
    "database.templateList.UntitledDatabaseTitle": "无标题",
    "database.templatePicker.emptyPageTitle": "空白页",
    "database.templatePickerItem.actionMenu.delete": "删除",
    "database.templatePickerItem.actionMenu.duplicate": "创建副本",
    "database.templatePickerItem.actionMenu.edit": "编辑",
    "database.templatePickerItem.actionMenu.repeat": "重复",
    "database.templatePickerItem.actionMenu.view": "视图",
    "database.templatePickerItem.editTemplate.tooltip": "编辑此模板",
    "database.templatePickerItem.mobileRepeatModal.title": "重复",
    "database.templatePickerItem.quickOptionMenuItem.day": "每天",
    "database.templatePickerItem.quickOptionMenuItem.month": "每月",
    "database.templatePickerItem.quickOptionMenuItem.week": "每周",
    "database.templatePickerItem.quickOptionMenuItem.year": "每年",
    "database.templatePickerMenuItem.default": "默认",
    "database.templateView.newTemplateButton": "新模板",
    "database.templatesList.templatesFor": "模板・用于",
    "database.timelineByMenu.dateRange": "日期范围",
    "database.timelineByMenu.endDate": "结束日期",
    "database.timelineByMenu.startDate": "开始日期",
    "database.timelineByMenu.title": "时间轴显示",
    "database.timelineByMenu.useSeparatePropertiesToggle":
      "使用单独的开始和结束日期",
    "database.timelineView.addRowButton": "新建",
    "database.timelineView.controlHeader.showTableButton.title": "显示表格",
    "database.timelineView.controlHeader.todayButton.title": "今天",
    "database.timelineView.dateProperty.defaultName": "日期",
    "database.timelineView.emptyTablePlaceholder": "此表内容为空。",
    "database.timelineView.item.addRowButton": "新建",
    "database.timelineView.missingDateProperty":
      "无法呈现此视图，因为数据库缺少日期属性。",
    "database.timelineView.mobileTimelineZoomPicker.title": "选择缩放等级",
    "database.timelineView.tableGroupResults.hideTableButton.title": "隐藏表格",
    "database.timelineView.zoomLevel.biWeek": "双周",
    "database.timelineView.zoomLevel.day": "天",
    "database.timelineView.zoomLevel.hours": "小时",
    "database.timelineView.zoomLevel.month": "月度",
    "database.timelineView.zoomLevel.quarter": "季度",
    "database.timelineView.zoomLevel.week": "周",
    "database.timelineView.zoomLevel.year": "年度",
    "database.titleColumn.name": "标题",
    "database.viewBlockSettings.appConfiguration.advanced": "高级",
    "database.viewBlockSettings.appConfiguration.databases": "数据库",
    "database.viewBlockSettings.appConfiguration.features": "功能",
    "database.viewBlockSettings.appConfiguration.presets": "预设",
    "database.viewBlockSettings.appConfiguration.saveForEveryone":
      "为所有人保存",
    "database.viewBlockSettings.appConfiguration.showMoreFeaturesButton.label":
      "另外 {num} 个...",
    "database.viewBlockSettings.appConfiguration.templates": "模板",
    "database.viewBlockSettings.appConfiguration.title": "模板设置",
    "database.viewBlockSettings.database.add": "添加数据库",
    "database.viewBlockSettings.database.delete": "删除数据库",
    "database.viewBlockSettings.database.namePlaceholder": "数据库名称",
    "database.viewBlockSettings.database.newProperty": "新建属性",
    "database.viewBlockSettings.database.title":
      "在 {viewBlockName} 中编辑数据库",
    "database.viewBlockSettings.databases.addDatabase": "添加数据库",
    "database.viewBlockSettings.databases.databaseSummary":
      "{propertyCount, plural, one {{propertyCount} 个属性} other {{propertyCount} 个属性}} • 用于 {viewCount, plural, one {{viewCount} 个视图} other {{viewCount} 个视图}}",
    "database.viewBlockSettings.databases.linkedDatabases": "链接数据库",
    "database.viewBlockSettings.databases.properties": "属性",
    "database.viewBlockSettings.databases.sourceDatabases": "源数据库",
    "database.viewBlockSettings.databases.title":
      "管理 {viewBlockName} 中的数据库",
    "database.viewHelpers.dateProperty.defaultName": "日期",
    "database.viewHelpers.defaultFilterName": "无标题",
    "database.viewHelpers.firstPersonPropertyValue": "我",
    "database.viewHelpers.selectProperty.defaultName": "状态",
    "database.viewPropertiesMenu.coverFormat.none": "无",
    "database.viewPropertiesMenu.coverFormat.pageContent": "页面内容",
    "database.viewPropertiesMenu.coverFormat.pageCover": "页面封面",
    "database.viewPropertiesMenu.coverSize.large": "大",
    "database.viewPropertiesMenu.coverSize.medium": "中",
    "database.viewPropertiesMenu.coverSize.small": "小",
    "database.viewPropertiesMenu.firstLoadLimitSetting": "加载限制",
    "database.viewPropertiesMenu.peekMode.centerPeek": "居中预览",
    "database.viewPropertiesMenu.peekMode.defaultForView": "{view} 的默认值",
    "database.viewPropertiesMenu.peekMode.description.centerPeek":
      "以聚焦且居中的模式打开页面。",
    "database.viewPropertiesMenu.peekMode.description.fullPage":
      "以整页方式打开页面。",
    "database.viewPropertiesMenu.peekMode.description.sidePeek":
      "在一侧打开页面。将视图保持在交互视图后面。",
    "database.viewPropertiesMenu.peekMode.fullPage": "整页",
    "database.viewPropertiesMenu.peekMode.sidePeek": "侧边预览",
    "database.viewSettigs.searchCollections.thisDatabase.tooltip": "此数据库",
    "database.viewSettings.collectionPropertyLimitHelpers.limit": "限值",
    "database.viewSettings.collectionPropertyLimitHelpers.limitOne":
      "1 个 {type}",
    "database.viewSettings.collectionPropertyLimitHelpers.limitOne.relation":
      "1 页",
    "database.viewSettings.collectionPropertyLimitHelpers.noLimit": "无限制",
    "database.viewSettings.configureSelfRelationTab.accept.title":
      "创建关联关系",
    "database.viewSettings.configureSelfRelationTab.createNewPropertyOption.caption":
      "<b>不同步</b>：在“任务”数据库中搭建“相关任务”属性时，请使用此选项。",
    "database.viewSettings.configureSelfRelationTab.createNewPropertyOption.title":
      "创建新属性",
    "database.viewSettings.configureSelfRelationTab.samePropertyOption.caption":
      "<b>双向同步</b>：在“任务”数据库中搭建“父任务”和“子任务”属性时，请使用此选项。",
    "database.viewSettings.configureSelfRelationTab.samePropertyOption.title":
      "使用同一个属性",
    "database.viewSettings.configureSelftRelationTab.title": "新建关联关系",
    "database.viewSettings.copyLinkSnackBarItem.title":
      "视图链接已复制到剪贴板",
    "database.viewSettings.createCollectionTab.createCollectionButton.title":
      "创建数据库",
    "database.viewSettings.createCollectionTab.inputPlaceholder": "数据库名称",
    "database.viewSettings.createCollectionTab.title": "新建数据库",
    "database.viewSettings.createCustomFilterTab.doneButton.title": "完成",
    "database.viewSettings.createCustomFilterTab.title": "新建筛选器",
    "database.viewSettings.createFilterTab.addAdvancedFilter.title":
      "添加高级筛选器",
    "database.viewSettings.createFilterTab.advancedFilter.title": "高级筛选器",
    "database.viewSettings.createFilterTab.advancedFilterRulesCount.title":
      "{ruleCount, plural, other {{ruleCount} 条规则}}",
    "database.viewSettings.createFilterTab.doneButton.title": "自定义筛选器",
    "database.viewSettings.createFilterTab.inputPlaceholder": "筛选方式…",
    "database.viewSettings.createFilterTab.suggestedFilters.title":
      "建议筛选器",
    "database.viewSettings.createFilterTab.title": "添加筛选器",
    "database.viewSettings.createPropertyTab.title": "新建属性",
    "database.viewSettings.createSortTab.inputPlaceholder": "排序方式…",
    "database.viewSettings.createSortTab.title": "新建排序",
    "database.viewSettings.createViewSourceTab.newCollectionButton.title":
      "新建数据库",
    "database.viewSettings.createViewSourceTab.newCollectionWithNameButton.title":
      "新建数据库“{filterText}”",
    "database.viewSettings.createViewSourceTab.title": "选择数据源",
    "database.viewSettings.createViewTab.doneButton.title": "完成",
    "database.viewSettings.createViewTab.newCollectionButton.title":
      "新建数据库",
    "database.viewSettings.createViewTab.title": "新建视图",
    "database.viewSettings.databases.title": "数据库",
    "database.viewSettings.dateOptions.dateFormat": "日期格式",
    "database.viewSettings.dateOptions.timeFormat": "时间格式",
    "database.viewSettings.deleteButton.text": "删除视图",
    "database.viewSettings.deletedPropertiesTab.noResults": "无结果",
    "database.viewSettings.deletedPropertiesTab.permanentlyDeleteProperty.modal.prompt":
      "是否确定要删除此属性？",
    "database.viewSettings.duplicateExistingViewTab.inputPlaceholder":
      "搜索视图…",
    "database.viewSettings.duplicateExistingViewTab.newEmptyViewButton.title":
      "新建空视图",
    "database.viewSettings.duplicateExistingViewTab.noResultsTitle": "无结果",
    "database.viewSettings.duplicateExistingViewTab.showMore.title":
      "显示其他 {showMore} 个",
    "database.viewSettings.duplicateExistingViewTab.title": "拷贝现有视图",
    "database.viewSettings.editRelation.noTarget.title": "无目标",
    "database.viewSettings.editRelation.selfRelationTarget.title": "此数据库",
    "database.viewSettings.editRelation.targetLink.title": "关联到",
    "database.viewSettings.editRelation.updateButton.title": "更新关联关系",
    "database.viewSettings.filterAndSortSaveControl.filter.caption":
      "{count, plural, other {{count} 个筛选器已更改，不同于其他人看到的情况}}",
    "database.viewSettings.filterAndSortSaveControl.more": "更多选项",
    "database.viewSettings.filterAndSortSaveControl.resetFilters": "重置筛选器",
    "database.viewSettings.filterAndSortSaveControl.resetSorts": "重置排序",
    "database.viewSettings.filterAndSortSaveControl.sort.caption":
      "排序已更改，不同于其他人看到的情况",
    "database.viewSettings.filterTab.deleteFilter.modal.confirmButton": "删除",
    "database.viewSettings.filterTab.deleteFilter.modal.prompt":
      "确定要删除该筛选器？",
    "database.viewSettings.filterTab.deleteFilterButton.title": "删除筛选器",
    "database.viewSettings.filterTab.removeButton.title": "移除",
    "database.viewSettings.filterTab.title": "高级筛选器",
    "database.viewSettings.filterTab.turnOnByDefault.title": "默认开启",
    "database.viewSettings.filtersTab.advancedFilterEdit.title": "编辑",
    "database.viewSettings.filtersTab.defaultOn.title": "默认启用",
    "database.viewSettings.filtersTab.newFilter.title": "添加筛选器",
    "database.viewSettings.filtersTab.title": "筛选器",
    "database.viewSettings.formulaOptions.edit": "编辑",
    "database.viewSettings.formulaOptions.title": "函数",
    "database.viewSettings.groupByTypeTab.dateBy": "按日期",
    "database.viewSettings.groupByTypeTab.numberBy": "按数字",
    "database.viewSettings.groupByTypeTab.statusBy": "按状态",
    "database.viewSettings.groupByTypeTab.textBy": "按文本",
    "database.viewSettings.groupTab.colorColumns": "颜色列",
    "database.viewSettings.groupTab.group.title": "群组",
    "database.viewSettings.groupTab.groupProperty": "分组方式",
    "database.viewSettings.groupTab.hideEmptyGroups": "隐藏空群组",
    "database.viewSettings.groupTab.learnMoreButton.title": "了解分组",
    "database.viewSettings.groupTab.noGroupingSetMessage": "无",
    "database.viewSettings.groupTab.removeButton.title": "移除分组",
    "database.viewSettings.groupTab.sort": "排序",
    "database.viewSettings.groupTab.sortType.alphabetical": "按字母顺序",
    "database.viewSettings.groupTab.sortType.ascending": "升序",
    "database.viewSettings.groupTab.sortType.chronological": "按时间顺序",
    "database.viewSettings.groupTab.sortType.descending": "降序",
    "database.viewSettings.groupTab.sortType.manual": "手动",
    "database.viewSettings.groupTab.sortType.reverseAlphabetical":
      "按反向字母顺序",
    "database.viewSettings.groupTab.sortType.reverseChronological":
      "按时间倒序",
    "database.viewSettings.groupTab.subGroup.title": "子组",
    "database.viewSettings.groupTab.subGroupProperty": "子组分组方式",
    "database.viewSettings.layoutTab.boardGroupByButton.title": "分组方式",
    "database.viewSettings.layoutTab.cardPreviewButtonTitle": "卡片预览",
    "database.viewSettings.layoutTab.firstLoadLimitSetting": "加载限制",
    "database.viewSettings.layoutTab.learnMoreButton.title": "了解视图",
    "database.viewSettings.layoutTab.limitPagesTitle": "{limit} 页",
    "database.viewSettings.layoutTab.peekModeTitle": "打开页面方式",
    "database.viewSettings.layoutTab.propertiesButton.propertiesShown.title":
      "{propertiesShown} 已显示",
    "database.viewSettings.layoutTab.showCalendarByProperty.title":
      "日历显示方式",
    "database.viewSettings.layoutTab.showDatabaseTitle.title": "显示数据库标题",
    "database.viewSettings.layoutTab.showTimelineByProperty.title":
      "时间轴显示方式",
    "database.viewSettings.layoutTab.tablePropertiesButton.title": "表格属性",
    "database.viewSettings.layoutTab.tableWrapAllColumns": "对所有列应用换行",
    "database.viewSettings.layoutTab.timelineEndDate.title": "结束日期",
    "database.viewSettings.layoutTab.timelineStartDate.title": "开始日期",
    "database.viewSettings.layoutTab.timelineUseSeparateDates.title":
      "单独的开始和结束日期",
    "database.viewSettings.layoutTab.title": "布局",
    "database.viewSettings.mainTab.contentOnlyEditorPill.subtitle":
      "内容编辑者可以编辑页面，但不能更改视图和数据库设置。",
    "database.viewSettings.mainTab.contentOnlyEditorPill.title":
      "你是内容编辑者",
    "database.viewSettings.mainTab.copyLinkButton.title": "拷贝视图链接",
    "database.viewSettings.mainTab.deleteButton.title": "删除视图",
    "database.viewSettings.mainTab.deleteViewConfirm.text":
      "确定要删除此视图？",
    "database.viewSettings.mainTab.duplicateButton.title": "创建视图副本",
    "database.viewSettings.mainTab.filterButton.filters.title":
      "{numberOfFilters, plural, other {{numberOfFilters} 个筛选器}}",
    "database.viewSettings.mainTab.filterButton.noFilters.title": "无",
    "database.viewSettings.mainTab.filterButton.title": "筛选器",
    "database.viewSettings.mainTab.groupButton.title": "群组",
    "database.viewSettings.mainTab.layoutButton.title": "布局",
    "database.viewSettings.mainTab.lockDatabase.title": "锁定数据库",
    "database.viewSettings.mainTab.lockViews.title": "锁定视图",
    "database.viewSettings.mainTab.propertiesButton.propertiesShown.title":
      "已显示 {propertiesShown}",
    "database.viewSettings.mainTab.propertiesButton.title": "属性",
    "database.viewSettings.mainTab.removeViewConfirm.text":
      "确定要删除此视图？",
    "database.viewSettings.mainTab.sortButton.noSorts.title": "无",
    "database.viewSettings.mainTab.sortButton.oneOrMoreSorts.title":
      "{numberOfSorts, plural, other {{numberOfSorts} 个排序}}",
    "database.viewSettings.mainTab.sortButton.title": "排序",
    "database.viewSettings.mainTab.sourceButton.title": "来源",
    "database.viewSettings.mainTab.subGroupButton.title": "子组",
    "database.viewSettings.mainTab.title": "查看选项",
    "database.viewSettings.mainTab.unlockDatabase.title": "解锁数据库",
    "database.viewSettings.mainTab.unlockViews.title": "解锁视图",
    "database.viewSettings.mainTab.viewNamePlaceholder.title": "视图名称",
    "database.viewSettings.mainTab.viewNameSection.title": "视图名称",
    "database.viewSettings.numberOptions.color": "颜色",
    "database.viewSettings.numberOptions.divideBy": "除以",
    "database.viewSettings.numberOptions.numberFormat": "数字格式",
    "database.viewSettings.numberOptions.showValue": "显示编号",
    "database.viewSettings.numberPercentOptions.showAs": "显示为",
    "database.viewSettings.propertiesTab.deletedProperties": "已删除属性",
    "database.viewSettings.propertiesTab.hiddenInBoardTitle": "在看板中隐藏",
    "database.viewSettings.propertiesTab.hiddenInCalendarTitle": "在日历中隐藏",
    "database.viewSettings.propertiesTab.hiddenInGalleryTitle": "在画廊中隐藏",
    "database.viewSettings.propertiesTab.hiddenInListTitle": "在列表中隐藏",
    "database.viewSettings.propertiesTab.hiddenInTableTitle": "在表格中隐藏",
    "database.viewSettings.propertiesTab.hiddenInTimelineTitle":
      "在时间轴中隐藏",
    "database.viewSettings.propertiesTab.hideAllProperties": "全部隐藏",
    "database.viewSettings.propertiesTab.inputPlaceholder": "搜索属性…",
    "database.viewSettings.propertiesTab.learnMoreButton.title": "了解属性",
    "database.viewSettings.propertiesTab.newProperty": "新建属性",
    "database.viewSettings.propertiesTab.newProperty.defaultNamePrefix": "属性",
    "database.viewSettings.propertiesTab.noResults": "无结果",
    "database.viewSettings.propertiesTab.showAllProperties": "全部显示",
    "database.viewSettings.propertiesTab.showTable": "显示表格",
    "database.viewSettings.propertiesTab.shownInBoardTitle": "在看板中显示",
    "database.viewSettings.propertiesTab.shownInCalendarTitle": "在日历中显示",
    "database.viewSettings.propertiesTab.shownInGalleryTitle": "在画廊中显示",
    "database.viewSettings.propertiesTab.shownInListTitle": "在列表中显示",
    "database.viewSettings.propertiesTab.shownInTableTitle": "在表格中显示",
    "database.viewSettings.propertiesTab.shownInTimelineTitle":
      "在时间轴中显示",
    "database.viewSettings.propertiesTab.tableProperties": "表格",
    "database.viewSettings.propertiesTab.timelineProperties": "时间轴",
    "database.viewSettings.propertiesTab.title": "属性",
    "database.viewSettings.propertySelect.inputPlaceholder": "搜索属性…",
    "database.viewSettings.propertySelect.noResultsTitle": "无结果",
    "database.viewSettings.propertySelect.noneMessage": "无",
    "database.viewSettings.propertySelect.showMoreTitle": "其他 {moreCount} 个",
    "database.viewSettings.propertyTab.deleteButton.title": "删除属性",
    "database.viewSettings.propertyTab.deleteProperty.modal.confirmButton":
      "删除",
    "database.viewSettings.propertyTab.deleteProperty.modal.prompt":
      "确定要删除该属性吗？",
    "database.viewSettings.propertyTab.duplicateButton.title": "创建属性副本",
    "database.viewSettings.propertyTab.duplicatePropertyNameError":
      "此数据库中已经存在一个名为 {propertyName} 的属性。",
    "database.viewSettings.propertyTab.formulas.learnMoreButton.title":
      "了解函数",
    "database.viewSettings.propertyTab.hideButton.title": "隐藏",
    "database.viewSettings.propertyTab.hideInViewButton.title": "在视图中隐藏",
    "database.viewSettings.propertyTab.propertyName": "属性名称",
    "database.viewSettings.propertyTab.propertyNameInput.title": "属性名称",
    "database.viewSettings.propertyTab.propertyType": "类型",
    "database.viewSettings.propertyTab.relations.learnMoreButton.title":
      "了解关联关系",
    "database.viewSettings.propertyTab.removeButton.title": "删除",
    "database.viewSettings.propertyTab.rollups.learnMoreButton.title":
      "了解汇总",
    "database.viewSettings.propertyTab.showButton.title": "显示",
    "database.viewSettings.propertyTab.showInViewButton.title": "在视图中显示",
    "database.viewSettings.propertyTab.title": "编辑属性",
    "database.viewSettings.propertyTypeSection.advanced": "高级",
    "database.viewSettings.propertyTypeSection.basic": "基本",
    "database.viewSettings.propertyTypeSelect.inputPlaceholder":
      "搜索属性类型…",
    "database.viewSettings.propertyTypeSelect.noResultsTitle": "无结果",
    "database.viewSettings.rollupOptions.calculate": "计算",
    "database.viewSettings.rollupOptions.relationProperty": "关联关系",
    "database.viewSettings.rollupOptions.selectRelation": "选择",
    "database.viewSettings.rollupOptions.selectTargetProperty": "选择",
    "database.viewSettings.rollupOptions.targetProperty": "属性",
    "database.viewSettings.searchCollections.inputPlaceholder":
      "链接或创建数据库…",
    "database.viewSettings.searchCollections.noResultsTitle": "无结果",
    "database.viewSettings.searchCollections.showMore.title":
      "显示其他 {showMore} 个",
    "database.viewSettings.selectNewRelationSourceTab.title":
      "新建关联关系目标",
    "database.viewSettings.selectOptions.addOption": "添加选项",
    "database.viewSettings.selectOptions.addStatus": "添加状态",
    "database.viewSettings.selectOptions.newSelectOption.inputPlaceholder":
      "输入新选项…",
    "database.viewSettings.selectOptions.noOptions": "添加选项",
    "database.viewSettings.selectOptions.title": "选项",
    "database.viewSettings.selectRelationSourceTab.inputPlaceholder":
      "搜索数据库",
    "database.viewSettings.selectRelationSourceTab.title": "新建关联关系",
    "database.viewSettings.setupRelationTab.addButton.title": "添加关联关系",
    "database.viewSettings.setupRelationTab.autoRelate.title": "自动关联",
    "database.viewSettings.setupRelationTab.autoRelateTooltip":
      "关联将根据在页面属性中找到的链接自动填充。",
    "database.viewSettings.setupRelationTab.createInverseDisabledWarning.title":
      "无法在目标数据库上创建反向关联关系。",
    "database.viewSettings.setupRelationTab.createInverseRelation":
      "创建反向关联关系",
    "database.viewSettings.setupRelationTab.deleteInverseDisabledWarning.title":
      "无法删除目标数据库上的反向关联关系。",
    "database.viewSettings.setupRelationTab.deleteInverseRelation":
      "删除反向关联关系",
    "database.viewSettings.setupRelationTab.inverseDisabledWarning.title":
      "无法编辑目标数据库。",
    "database.viewSettings.setupRelationTab.inverseRelationName.placeholder":
      "与目标相关",
    "database.viewSettings.setupRelationTab.inverseRelationNameInput.title":
      "{databaseName}上的相关属性",
    "database.viewSettings.setupRelationTab.inverseRelationTooltip":
      "在 {databaseName} 上创建一个属性，显示指向当前数据库的反向链接",
    "database.viewSettings.setupRelationTab.inverseRelationTooltip.selfRelation":
      "为双向关系的每个方向创建反向属性。可用于对父任务/子任务、阻止者/阻止等进行建模。",
    "database.viewSettings.setupRelationTab.inverseSelfRelationNameInput.title":
      "相关属性名称",
    "database.viewSettings.setupRelationTab.relation.reverse":
      "在 {databaseName} 中显示",
    "database.viewSettings.setupRelationTab.relation.reverseNoDB":
      "在目标中显示",
    "database.viewSettings.setupRelationTab.relationVisualizer.title": "预览",
    "database.viewSettings.setupRelationTab.selfRelation.reverse": "反向",
    "database.viewSettings.setupRelationTab.title": "新建关联关系",
    "database.viewSettings.sortTab.deleteAllSorts": "删除排序",
    "database.viewSettings.sortTab.mobile.sort": "排序 {sortNumber}",
    "database.viewSettings.sortTab.mobileDeleteButtonTitle": "删除",
    "database.viewSettings.sortTab.newSort": "添加排序",
    "database.viewSettings.sortTab.title": "排序",
    "database.viewSettings.sourceTab.inputPlaceholder": "链接或创建数据库…",
    "database.viewSettings.sourceTab.newCollectionMenuItem.title":
      "新建数据库“{filterText}”",
    "database.viewSettings.sourceTab.suggestedSources": "建议的来源",
    "database.viewSettings.sourceTab.title": "来源",
    "database.viewSettings.statusOptions.showAs": "显示为",
    "database.viewSettings.syncedSourceTab.limit": "限值",
    "database.viewSettings.syncedSourceTab.limitRows": "{value}/{limit} 行",
    "database.viewSettings.syncedSourceTab.sourceDatabase": "源数据库",
    "database.viewSettings.syncedSourceTab.update": "立即同步",
    "database.viewSettings.syncedSourceTab.update.rateLimitError":
      "你的数据库最近已更新。你可以稍后再试，也可以等待自动重新同步。",
    "database.viewSettings.timelineByPropertyTab.timelineByEndProperty.title":
      "结束日期",
    "database.viewSettings.timelineByPropertyTab.timelineStartDate.title":
      "开始日期",
    "database.viewSettings.viewActionMenu.copyLink": "拷贝视图链接",
    "database.viewSettings.viewActionMenu.delete": "删除",
    "database.viewSettings.viewActionMenu.duplicate": "创建副本",
    "database.viewSettings.viewActionMenu.editView": "编辑视图",
    "database.viewSettings.viewActionMenu.rename": "重命名",
    "database.viewSettings.viewActionMenu.showDatabaseTitle": "显示数据库标题",
    "databaseActions.removeSortingConfirmationDialog.prompt": "要移除排序吗？",
    "databaseActions.removeSortingConfirmationDialog.removeSortingButton.label":
      "移除",
    "databaseRelationOperators.selectPlaceholder": "选择页面",
    "databaseTemplatePickerActions.duplicateTemplateFailedError.message":
      "保存模板失败。",
    "databaseViewActions.importFailedError.message": "导入失败。",
    "databaseViewActions.importingCSV.loadingMessage": "导入中",
    "databaseViewActions.uploadingCSV.loadingMessage": "上传中",
    "databdatabase.viewSettings.layoutTab.cardSizeButtonTitle": "卡片大小",
    "databdatabase.viewSettings.layoutTab.fitImageButtonTitle":
      "自适应图片大小",
    "databdatabase.viewSettings.layoutTab.tableWrapCells": "单元格换行",
    "dateFormatHelpers.reminderMenuItems.atTimeOfEvent": "在事件发生时",
    "dateFormatHelpers.reminderMenuItems.daysBefore":
      "{numberOfDays, plural, other {在 {formattedTimeText} 之前的 {numberOfDays} 天}}",
    "dateFormatHelpers.reminderMenuItems.hoursBefore":
      "{numberOfHours, plural, other {提前 {numberOfHours} 小时}}",
    "dateFormatHelpers.reminderMenuItems.minutesBefore":
      "{numberOfMinutes, plural, other {提前 {numberOfMinutes} 分钟}}",
    "dateFormatHelpers.reminderMenuItems.monthsBefore":
      "{numberOfMonths, plural, other {在 {formattedTimeText} 之前的 {numberOfMonths} 个月}}",
    "dateFormatHelpers.reminderMenuItems.none": "无",
    "dateFormatHelpers.reminderMenuItems.onTheDayOfEvent":
      "在事件当天的 {formattedTimeText}",
    "dateFormatHelpers.reminderMenuItems.weeksBefore":
      "{numberOfWeeks, plural, other {在 {formattedTimeText} 之前的 {numberOfWeeks} 周}}",
    "dateFormatHelpers.reminderMenuItems.yearsBefore":
      "{numberOfYears, plural, other {在 {formattedTimeText} 之前的 {numberOfYears} 年}}",
    "dateFormatHelpers.text.lastDayOfTheWeek": "上{dayOfTheWeek}",
    "dateFormatHelpers.text.nextDayOfTheWeek": "下{dayOfTheWeek}",
    "dateFormatHelpers.text.today": "今天",
    "dateFormatHelpers.text.tomorrow": "明天",
    "dateFormatHelpers.text.yesterday": "昨天",
    "dateHelpers.12hourTimeFormat": "12 小时",
    "dateHelpers.24hourTimeFormat": "24 小时",
    "dateHelpers.dateFormat.dayMonthYear": "日/月/年",
    "dateHelpers.dateFormat.explicitMonthDayYear": "年月日",
    "dateHelpers.dateFormat.fullDate": "完整日期",
    "dateHelpers.dateFormat.monthDayYear": "月/日/年",
    "dateHelpers.dateFormat.relative": "相对日期",
    "dateHelpers.dateFormat.yearMonthDay": "年/月/日",
    "dateInputError.invalidDateError.tooltip": "无效日期",
    "dateInputError.invalidDateRangeError.tooltip": "无效范围",
    "dateParserHelpers.at": "时间：",
    "dateParserHelpers.day": "工作",
    "dateParserHelpers.last": "过去",
    "dateParserHelpers.me": "我",
    "dateParserHelpers.month": "月",
    "dateParserHelpers.next": "下一个",
    "dateParserHelpers.now": "现在",
    "dateParserHelpers.remind": "提醒符_通知",
    "dateParserHelpers.today": "今天",
    "dateParserHelpers.today.short": "td",
    "dateParserHelpers.tomorrow": "明天",
    "dateParserHelpers.tomorrow.short": "tm",
    "dateParserHelpers.year": "年",
    "dateParserHelpers.yesterday": "昨天",
    "dateParserHelpers.yesterday.short": "yd",
    "datePropertyMenu.clearButton.label": "清除日期",
    "datePropertyMenu.dateFormatDropdownButton.label": "日期格式",
    "datePropertyMenu.formatMenu.emptyButton.label": "未填写",
    "datePropertyMenu.invalidDateError.tooltip": "无效日期",
    "datePropertyMenu.invalidDateOrTimeRangeError.tooltip": "无效范围",
    "datePropertyMenu.invalidTimeError.tooltip": "无效时间",
    "datePropertyMenu.learnMore.helpButton.label": "了解提醒",
    "datePropertyMenu.menuItem.endDate.label": "结束日期",
    "datePropertyMenu.menuItem.format.label": "日期格式",
    "datePropertyMenu.menuItem.formatAndTimezone.label": "日期格式与时区",
    "datePropertyMenu.menuItem.includeTime.label": "包含时间",
    "datePropertyMenu.menuItem.remind.label": "提醒",
    "datePropertyMenu.menuItem.select.title": "选择时区",
    "datePropertyMenu.menuItem.time.label": "时区",
    "datePropertyMenu.menuItem.timeFormat.label": "时间格式",
    "datePropertyMenu.mobileDate.title": "日期",
    "datePropertyMenu.mobileDateFormatModal.title": "日期格式",
    "datePropertyMenu.mobileDoneButton.label": "完成",
    "datePropertyMenu.mobileDoneReminderButton.label": "完成",
    "datePropertyMenu.mobileRemindModal.title": "提醒",
    "datePropertyMenu.mobileTimezoneMenu.title": "时区",
    "datePropertyMenu.timeFormatMenu.emptyButton.label": "未填写",
    "datePropertyMenu.timeFormatMenu.title": "时间格式",
    "datePropertyMenu.timeSearch.placeholder": "搜索时区…",
    "datePropertyMenu.timezoneMenu.noResults": "无结果",
    "datePropertyMenu.timezoneMenu.select.placeholder": "选择时区",
    "dateRangeMenu.relativeDateToggle.mobileButton.label": "使用相对日期",
    "ddatabase.templatePickerItem.mobileDoneRepeatButton.label": "已完成",
    "deepnoteBlock.embeds.button.label": "嵌入 Deepnote",
    "deepnoteBlock.embeds.caption": "适用于具有公开链接的 Deepnote 块",
    "deepnoteBlock.placeholder": "嵌入 Deepnote",
    "defaultTeamsInput.defaultTeamList.title": "团队空间",
    "desktop.rightClickMenu.copyEmailAddress": "复制邮箱地址地址",
    "desktop.rightClickMenu.copyImage": "复制图片",
    "desktop.rightClickMenu.copyImageAddress": "复制图片地址",
    "desktop.rightClickMenu.copyLink": "复制链接",
    "desktop.rightClickMenu.openLink": "打开链接",
    "desktop.searchMenuItem.searchWithGoogle.title": "用谷歌搜索",
    "desktop.spellcheckMenuItem.disableSpellcheck.title": "禁用拼写检查",
    "desktop.spellcheckMenuItem.enableSpellcheck.title": "启用拼写检查",
    "desktop.textEditingMenuItem.copyAction.title": "复制",
    "desktop.textEditingMenuItem.cutAction.title": "剪切",
    "desktop.textEditingMenuItem.pasteAction.title": "粘贴",
    "desktopAppUpdater.dialog.dismissButton.label": "好的",
    "desktopAppUpdater.moveNotionToApplicationsFolderDialog.dismissButton.label":
      "好的",
    "desktopAppUpdater.moveNotionToApplicationsFolderDialog.prompt":
      "请将 Notion 应用程序移至 /Applications 文件夹，以使自动更新程序正常工作。",
    "desktopAppUpdater.restartDialog.message":
      "请退出并重新启动应用程序以安装更新。",
    "desktopLogin.footer.helpCenterLink": "需要帮助？",
    "desktopLogin.footer.privacyAndTermsLink": "隐私与条款",
    "desktopLogin.loginOrSignupToSyncMessage": "登录以同步内容。",
    "desktopLogin.upgradeWarning.appOutOfDateMessage.mac":
      "你的 Mac 应用已过期。",
    "desktopLogin.upgradeWarning.appOutOfDateMessage.windows":
      "你的 Windows 应用已过期。",
    "desktopLogin.upgradeWarning.upgradeInstructions.mac":
      "请下载并重新安装你的 Mac 应用。",
    "desktopLogin.upgradeWarning.upgradeInstructions.windows":
      "请下载并重新安装你的 Windows 应用。",
    "desktopLogin.welcomeMessage.mac": "欢迎来到 Notion",
    "desktopLogin.welcomeMessage.windows": "欢迎来到 Notion",
    "developerIntegration.confirmationModal.cancelLabel": "取消",
    "developerIntegration.confirmationModal.confirmLabel": "继续",
    "developerIntegration.confirmationModal.deleteLabel": "删除",
    "developerIntegrationCard.botTagline.placeholder": "内部集成。",
    "developerIntegrationCard.dropdown.delete": "删除此集成",
    "developerIntegrationCard.integrationTagline.placeholder": "公共集成。",
    "developerIntegrationCard.placeholderCard.label": "创建新集成",
    "developerIntegrationCardDropdown.delete.confirmationError":
      "输入内容与集成名称不匹配。",
    "developerIntegrationCardDropdown.delete.confirmationMessage":
      "此公共集成将停用，并从其已添加到的所有工作区中删除。要确认，请输入此集成的名称。",
    "developerIntegrationCardDropdown.delete.confirmationTitle":
      "删除 {integrationName}？",
    "developerIntegrationForm.botToken.label": "内部集成令牌",
    "developerIntegrationForm.botToken.secretName": "令牌",
    "developerIntegrationForm.botToken.subtitle":
      "仅适用于 <bold>{spaceName}</bold> 工作区。要更改工作区，<developertermslink>创建另一个集成</developertermslink>。",
    "developerIntegrationForm.capabilities.caption":
      "当用户授权你集成时，将会向他们显示这些请求的功能。有关更多帮助，请参阅<inlinetextlink>开发者文档</inlinetextlink>。",
    "developerIntegrationForm.capabilities.comment_capabilities.title":
      "评论功能",
    "developerIntegrationForm.capabilities.content_capabilities.title":
      "内容功能",
    "developerIntegrationForm.capabilities.insert_comment.caption":
      "在块和页面上创建评论。",
    "developerIntegrationForm.capabilities.insert_comment.title": "插入评论",
    "developerIntegrationForm.capabilities.insert_content.caption":
      "请求创建新内容。",
    "developerIntegrationForm.capabilities.insert_content.title": "插入内容",
    "developerIntegrationForm.capabilities.label": "功能",
    "developerIntegrationForm.capabilities.no_user_capabilities.caption":
      "不要请求访问任何用户信息。",
    "developerIntegrationForm.capabilities.no_user_capabilities.title":
      "没有用户信息",
    "developerIntegrationForm.capabilities.read_comment.caption":
      "读取关于块和页面的评论。",
    "developerIntegrationForm.capabilities.read_comment.title": "读取评论",
    "developerIntegrationForm.capabilities.read_content.caption":
      "请求读取内容。",
    "developerIntegrationForm.capabilities.read_content.title": "读取内容",
    "developerIntegrationForm.capabilities.read_user_with_email.caption":
      "请求访问用户信息，包括电子邮件地址。",
    "developerIntegrationForm.capabilities.read_user_with_email.title":
      "读取用户信息，包括电子邮件地址",
    "developerIntegrationForm.capabilities.read_user_without_email.caption":
      "请求访问用户信息，不包括电子邮件地址。",
    "developerIntegrationForm.capabilities.read_user_without_email.title":
      "读取用户信息，不包括电子邮件地址",
    "developerIntegrationForm.capabilities.update_content.caption":
      "请求更新现有内容。",
    "developerIntegrationForm.capabilities.update_content.title": "更新内容",
    "developerIntegrationForm.capabilities.user_capabilities.title": "用户功能",
    "developerIntegrationForm.clientSecret.confirmationModal.confirm": "继续",
    "developerIntegrationForm.clientSecret.confirmationModal.message":
      "此客户端密钥将仅显示一次，无法再次查看。请确保你安全地存储该密钥。",
    "developerIntegrationForm.clientSecret.confirmationModal.title":
      "显示 OAuth 客户端密钥？",
    "developerIntegrationForm.developerName.caption":
      "公司或组织的名称。如果不适用，你可以使用自己的姓名。",
    "developerIntegrationForm.developerName.label": "公司名称",
    "developerIntegrationForm.developerSpace.label": "关联的工作区",
    "developerIntegrationForm.developerSpace.subtitle":
      "选择一个工作区来安装集成以进行开发。一旦获得批准，它将可供所有用户使用。",
    "developerIntegrationForm.domain.caption":
      "URL 域使用此集成展开。将在发布给用户之前验证域。",
    "developerIntegrationForm.domain.developmentDomain.label": "开发域名",
    "developerIntegrationForm.domain.label": "展开 Url 域",
    "developerIntegrationForm.domain.verifiedDomains.label": "已验证的域名",
    "developerIntegrationForm.domainVerification.caption":
      "开发和验证的域名，以便用此集成展开 URL。域名在发布给用户之前必须经过验证。有关更多的验证过程，请参阅 <textlink>Notion 文档</textlink>。",
    "developerIntegrationForm.email.label": "支持电子邮件",
    "developerIntegrationForm.email.subtitle":
      "用于链接到集成页面和身份验证屏幕中的集成支持电子邮件。",
    "developerIntegrationForm.external_client_id.label": "OAuth 客户端 ID",
    "developerIntegrationForm.external_client_secret.label": "OAuth 客户端密钥",
    "developerIntegrationForm.external_deletion_url.caption":
      "当用户删除你的集成时由 Notion 调用。",
    "developerIntegrationForm.external_deletion_url.label":
      "已删除令牌回调 URL（可选）",
    "developerIntegrationForm.external_oauth_authorize_url.caption":
      "由 Notion 用于通过集成启动用户授权。",
    "developerIntegrationForm.external_oauth_authorize_url.label":
      "OAuth 授权 URL",
    "developerIntegrationForm.external_oauth_scopes.caption":
      "可选作用域字符串",
    "developerIntegrationForm.external_oauth_scopes.label":
      "OAuth 作用域（可选）",
    "developerIntegrationForm.external_oauth_token_url.caption":
      "由 Notion 调用，检索展开回调 URL 的访问令牌。",
    "developerIntegrationForm.external_oauth_token_url.label": "OAuth 令牌 URL",
    "developerIntegrationForm.icon.label": "徽标",
    "developerIntegrationForm.icon.subtitle":
      "建议使用 512px x 512px 的 PNG 格式。",
    "developerIntegrationForm.integrationClientId.label": "OAuth 客户端 ID",
    "developerIntegrationForm.integrationSecret.label": "OAuth 客户端密钥",
    "developerIntegrationForm.integrationSecret.secretName": "密钥",
    "developerIntegrationForm.jsonEditor.error":
      "{value} 属性包含无效的 JSON。",
    "developerIntegrationForm.name.label": "名称",
    "developerIntegrationForm.name.subtitle": "用于向用户识别你的集成的名称。",
    "developerIntegrationForm.privacy_policy_url.label": "隐私政策",
    "developerIntegrationForm.privacy_policy_url.subtitle":
      "用于链接到集成页面和身份验证屏幕中的集成隐私政策。",
    "developerIntegrationForm.redirect_uri.label": "重定向 URI",
    "developerIntegrationForm.redirect_uri.subtitle":
      "在 Notion 的开放授权流程中，用户在使用 Notion 进行身份验证后将被重定向到此路径。此路径将附加访问授权代码，并且必须具有协议。它不能包含 URL 片段、相对路径或通配符，也不能是公共 IP 地址。它还必须包含在令牌请求中。",
    "developerIntegrationForm.redirect_uris.label": "重定向 URI",
    "developerIntegrationForm.regexAttributes.caption":
      "从正则表达式中提取属性。允许你在展开完成之前创建占位符内容。",
    "developerIntegrationForm.regexAttributes.label": "展开正则表达式属性",
    "developerIntegrationForm.regexPattern.caption":
      "当用户粘贴与此模式匹配的 URL 时，他们可以选择使用此集成展开。",
    "developerIntegrationForm.regexPattern.label": "展开正则表达式模式",
    "developerIntegrationForm.regexRule.name.label": "规则名称",
    "developerIntegrationForm.regexRule.pattern.label": "模式",
    "developerIntegrationForm.sampleUrls.caption":
      "提供你希望集成展开的示例。对于提供的任何示例，除非所有 URL 都与至少一个正则表达式模式匹配，否则我们将阻止保存。",
    "developerIntegrationForm.sampleUrls.label": "示例 URL",
    "developerIntegrationForm.sectionCaption.unfurling":
      "访问<previewlab>链接预览实验室</previewlab>，规划展开预览和响应。",
    "developerIntegrationForm.sectionHeader.basic": "基本信息",
    "developerIntegrationForm.sectionHeader.external_oauth": "外部授权设置",
    "developerIntegrationForm.sectionHeader.links": "组织信息",
    "developerIntegrationForm.sectionHeader.oauth": "OAuth 域和 URI",
    "developerIntegrationForm.sectionHeader.secrets": "密钥",
    "developerIntegrationForm.sectionHeader.unfurling": "展开域 &amp; 模式",
    "developerIntegrationForm.sectionSubtitle.external_oauth":
      "有关 OAuth 2.0 的信息，请参阅<textlink>官方 IETF 规范</textlink>。",
    "developerIntegrationForm.space.label": "关联的工作区",
    "developerIntegrationForm.space.subtitle":
      "选择一个工作区来安装集成。 你可以稍后升级集成以使用 OAuth。",
    "developerIntegrationForm.submissionType.label": "集成类型",
    "developerIntegrationForm.tagline.label": "标语",
    "developerIntegrationForm.tagline.subtitle": "集成功能的简短描述。",
    "developerIntegrationForm.template_url.label": "Notion模板URL",
    "developerIntegrationForm.template_url.subtitle":
      "(可选)必须是可复制的公共Notion页面的URL。用于在用户安装集成功能时将模板复制到用户的工作空间中。",
    "developerIntegrationForm.terms_of_use_url.label": "使用条款",
    "developerIntegrationForm.terms_of_use_url.subtitle":
      "用于链接到集成页面和身份验证屏幕中的集成使用条款。",
    "developerIntegrationForm.unfurlUrl.caption":
      "当发生展开操作时，用 POST 请求调用，当删除展开 uri 预览或提及时，用 DELETE 请求调用。",
    "developerIntegrationForm.unfurlUrl.label": "展开回调 URL",
    "developerIntegrationForm.urlMatchingAndPlaceholder.caption":
      "当用户在你的验证域上粘贴与此模式匹配的 URL 时，他们可以选择将其作为预览展开。任何示例 URL 都会根据提供的模式进行验证。",
    "developerIntegrationForm.urlMatchingAndPlaceholder.label":
      "URL 匹配和占位符",
    "developerIntegrationForm.website_url.label": "网站或主页",
    "developerIntegrationForm.website_url.subtitle":
      "用于链接到集成页面和身份验证屏幕中的集成网站或主页。",
    "developerIntegrationFormHandler.create.developerTerms":
      "提交即表示你同意 Notion 的<developertermslink>开发者条款</developertermslink>。",
    "developerIntegrationFormHandler.createIntegration.confirmationModal.confirm":
      "继续",
    "developerIntegrationFormHandler.createIntegration.confirmationModal.message":
      "你将获得一个 OAuth 密钥，并且需要实施 OAuth 进行授权。有关详细信息，请参阅<oauthdocumentationlink>开发人员文档</oauthdocumentationlink>。",
    "developerIntegrationFormHandler.createIntegration.confirmationModal.title":
      "切换到公共集成？",
    "developerIntegrationFormHandler.updateIntegration.capabilities.confirmationModal.confirm":
      "更改",
    "developerIntegrationFormHandler.updateIntegration.capabilities.confirmationModal.message":
      "集成的任何现有用户都需要重新进行身份验证。",
    "developerIntegrationFormHandler.updateIntegration.capabilities.confirmationModal.title":
      "更改请求的功能？",
    "developerIntegrationFormRegexRule.deletionModal.confirm": "删除",
    "developerIntegrationFormRegexRule.deletionModal.message":
      "在你提交表单之前，不会保存更改。",
    "developerIntegrationFormRegexRule.deletionModal.title":
      "是否确实要删除此正则表达式模式规则？",
    "developerIntegrationFormValidator.sampleUrls.sampleUrlDoesNotMatchProvidedDomain.error":
      "URL“{value}”与提供的域名不匹配。",
    "developerIntegrationFormValidator.sampleUrls.sampleUrlDoesNotMatchProvidedRegexes.error":
      "URL “{value}” 与提供的正则表达式模式不匹配。",
    "developerIntegrationFormValidator.sampleUrls.sampleUrlMissingDomain.error":
      "URL“{value}”缺少域名。",
    "developerIntegrationFormValidator.urlMatchingAndPlaceholder.attributes.error":
      "{value} 属性 JSON 与请求模式不匹配。",
    "developerIntegrationFormValidator.urlMatchingAndPlaceholder.regex.error":
      "{value} 正则表达式模式无效。",
    "developerIntegrationLab.domain.label": "域",
    "developerIntegrationLab.navigateBack.label": "返回集成",
    "developerIntegrationLab.regexAttributes.label": "正则表达式属性",
    "developerIntegrationLab.regexConfiguration.label": "管理正则表达式配置",
    "developerIntegrationLab.relatedAttributes.empty": "未找到相关属性。",
    "developerIntegrationLab.relatedAttributes.label": "已关联展开响应有效载荷",
    "developerIntegrationLab.rootAttributes.label": "展开响应负载",
    "developerIntegrationLab.rootUrl.label": "已将 URL 粘贴到预览",
    "developerIntegrationLab.subtitle.label":
      "规划预览 URL 正则表达式模式和 API 响应。",
    "developerIntegrationLab.title.label": "链接预览实验室",
    "developerIntegrationNotFound.subtitle.label": "此集成不存在。",
    "developerIntegrationNotFound.title.label": "未找到",
    "developerIntegrationView.publishedIntegrationWarning":
      "一旦你保存对此页面的更改，你在 Notion <integrationgallerylink>集成画廊</integrationgallerylink>中的列表将立即更新。",
    "developerIntegrationView.subtitle.label": "查看和编辑集成信息。",
    "developerIntegrationsCreate.error.capabilities.invalidContent":
      "必须至少请求一种内容功能。",
    "developerIntegrationsCreate.error.capabilities.invalidContent2":
      "必须请求至少一种功能。",
    "developerIntegrationsCreateInternal.error.invalidInput":
      "{ fieldName } 无效。",
    "developerIntegrationsCreateInternal.subtitle.label":
      "我们将指导你如何设置新的集成。",
    "developerIntegrationsCreateInternal.title.label": "创建新集成",
    "developerIntegrationsForm.clientIdCopied.tooltip": "ID 已复制",
    "developerIntegrationsForm.copiedId.label": "已复制",
    "developerIntegrationsForm.copyClientId.tooltip": "拷贝客户端 ID",
    "developerIntegrationsForm.copyId.label": "拷贝",
    "developerIntegrationsForm.error.missingRequired":
      "{ fieldName } 为必填项。",
    "developerIntegrationsForm.error.submission":
      "提交集成时出错。请重试，如果问题仍然存在，请联系客服。",
    "developerIntegrationsForm.redirectUri.typePrompt": "输入重定向 URI…",
    "developerIntegrationsForm.regexPatternRulesInput.addMore.label":
      "添加另一条规则",
    "developerIntegrationsForm.spacePicker.missingSpacesError":
      "你不是任何工作区的管理员。请<linktonotion>创建新工作区</linktonotion>或请求你的工作区管理员更新你的访问权限。",
    "developerIntegrationsForm.urlsInput.typePrompt": "输入或粘贴 URL…",
    "developerIntegrationsLayout.backButton.label": "我的集成",
    "developerIntegrationsLayout.document.title": "我的集成｜Notion 开发人员",
    "developerIntegrationsList.addNewButton.label": "新集成",
    "developerIntegrationsList.allFilter.label": "查看全部",
    "developerIntegrationsList.internalFilter.label": "内部",
    "developerIntegrationsList.publicFilter.label": "公共",
    "developerIntegrationsList.subtitle": "创建、审核和编辑开发信息和凭据。",
    "developerIntegrationsList.title": "我的集成",
    "developerIntegrationsList.viewIntegration.buttonText": "查看集成",
    "developerInternalIntegraion.integrationType.bot.caption":
      "仅适用于你作为其管理员的工作区。集成可以自动安装到这些工作区，不需要审核。",
    "developerInternalIntegraion.integrationType.bot.title": "内部集成",
    "developerInternalIntegraion.integrationType.integration.caption":
      "适用于任何 Notion 用户。可能需要审核和验证才能在集成画廊中列出。",
    "developerInternalIntegraion.integrationType.integration.title": "公共集成",
    "developerInternalIntegration.integrationType.internal.caption":
      "仅适用于你作为其管理员的工作区。集成可以自动安装到这些工作区，不需要审核。",
    "developerInternalIntegration.integrationType.internal.title": "内部集成",
    "developerInternalIntegration.integrationType.public.caption":
      "适用于任何 Notion 用户。可能需要审核和验证才能在集成画廊中列出。",
    "developerInternalIntegration.integrationType.public.title": "公共集成",
    "developerInternalIntegration.integrationType.unfurling.caption":
      "适用于任何 Notion 用户。可能需要审核和验证才能在集成画廊中列出。",
    "developerInternalIntegration.integrationType.unfurling.title": "展开集成",
    "dialog.acceptButton.label": "确认",
    "dialog.closeButton.label": "关闭",
    "dialog.dismissButton.label": "好的",
    "dialog.genericErrorMessage": "发生意外错误",
    "discussion.confirmDialog.discardReply.prompt": "你要放弃这条回复吗？",
    "discussion.confirmDialog.discardReplyButton.label": "放弃",
    "discussion.mobileReplyMenu.closeButton.label": "关闭",
    "discussion.mobileReplyMenu.title": "评论",
    "discussion.moreMessageTooltip": "更多评论",
    "discussion.showMoreCommentsSidebarButton.label":
      "{moreCommentsNumber, plural, other {还有 {moreCommentsNumber} 条评论}}",
    "discussionInput.defaultPlaceholder.addComment": "添加评论…",
    "discussionInput.insertMention.button.tooltip": "提及人员、页面或日期",
    "discussionInput.uploadFile.button.tooltip": "附加文件",
    "discussionInput.uploadFile.tooManyFilesErrorMessage":
      "每个评论不能上传超过 {maxFiles} 个文件。",
    "domainSettings.workspaceCreation.admin_only.caption":
      "只有主工作区的管理员可以创建新工作区。",
    "domainSettings.workspaceCreation.admin_only.captionWithSpaceName":
      "只有此工作区的管理员可以创建新工作区。",
    "domainSettings.workspaceCreation.admins_only.title": "仅限管理员",
    "domainSettings.workspaceCreation.admins_only.titleWithSpaceName":
      "{primaryWorkspaceName} 管理员",
    "domainSettings.workspaceCreation.byline": "自定义可以创建新工作区的用户。",
    "domainSettings.workspaceCreation.caption": "限制已验证域名的工作区创建。",
    "domainSettings.workspaceCreation.disabledTooltip":
      "必须至少有一个已验证的域名才能配置工作区创建设置。",
    "domainSettings.workspaceCreation.title": "工作区创建",
    "domainSettings.workspaceCreation.unrestricted.caption":
      "任何用户都可以创建新工作区",
    "domainSettings.workspaceCreation.unrestricted.title": "任何人",
    "domainSettings.workspaceCreation.workspaceOwnerOnly.title":
      "仅工作区所有者",
    "domainSettings.workspaceCreation.workspaceOwnersOnly.captionWithSpaceName":
      "只有此工作区的工作区所有者才能创建新工作区。",
    "domainSettings.workspaceCreation.workspaceOwnersOnly.title":
      "仅工作区所有者",
    "domainSettings.workspaceCreation.workspaceOwnersOnly.titleWithSpaceName":
      "{primaryWorkspaceName} 工作区所有者",
    "domainVerificationInput.domainInput.placeholder": "未配置域名",
    "domainVerificationInput.emailDomainsSection.removeDomain.accept":
      "删除域名",
    "domainVerificationInput.emailDomainsSection.removeDomain.cancel": "取消",
    "domainVerificationInput.emailDomainsSection.removeDomain.message":
      "确定要删除此域名？",
    "domainVerificationInput.emailDomainsSection.statusToken.invalid": "无效",
    "domainVerificationInput.emailDomainsSection.statusToken.notVerified":
      "未验证",
    "domainVerificationInput.emailDomainsSection.statusToken.verified":
      "已验证",
    "domainVerificationInput.myIntegrations.emailDomainsSection.removeDomain.description":
      "删除此域名（如果已验证）将阻止集成展开包含此域名的 URL。",
    "domainVerificationInput.securitySAMLSettings.emailDomainsSection.removeDomain.description":
      "如果该域名已经过验证，则删除该域名将阻止使用该电子邮件的其他人使用 SSO 登录。",
    downloadMacIntelLabel: "适用于配备 Intel 处理器的 Mac",
    downloadMacSiliconLabel: "适用于配备 Apple M1 的 Mac",
    "dragHandleButton.clickPrompt.text": "点击<medium>打开菜单</medium>",
    "dragHandleButton.dragPrompt.text": "拖动<medium>以移动</medium>",
    "duplicateActions.offlineError.message": "请连接网络后复制此块。",
    "duplicatePagePopup.buttonMenuItem.logoutButton.label": "登出（ {email} ）",
    "duplicatePagePopup.choooseWorkspaceMobileMenu.title": "选择工作区",
    "duplicatePagePopup.chooseWorkspace.menuItem.title": "选择工作区",
    "duplicateRateLimitError.message": "已达到块复制限制。请稍后再试。",
    "edit.blockDeletedEditStyles.defaultLabel": "已删除",
    "edit.blockDeletedEditStyles.factoryLabel": "已删除",
    "edit.bookmarkBlockProperty.label": "书签",
    "edit.bookmarkBlockPropertyChanged.label": "书签",
    "edit.calloutBlock.label": "标注",
    "edit.calloutBlockChanged.label": "标注",
    "edit.codeBlockChanged.label": "代码",
    "edit.codeBlockWithLanguageChanged.label": "代码 - {codeLanguage}",
    "edit.collectionBlock.untitled": "无标题",
    "edit.deletedPermissionGroup.label": "已删除的群组",
    "edit.descriptionPropertyChanged.label": "描述",
    "edit.descriptionPropertyCreated.label": "描述",
    "edit.equationBlock.label": "公式",
    "edit.equationBlockChanged.label": "公式",
    "edit.googleDriveFile.label": "谷歌云端硬盘文件",
    "edit.imageBlockChanged.updatedTitle": "更新为",
    "edit.pageBlock.untitled": "无标题",
    "edit.publishToWebPermissionTarget.label": "已发布的链接",
    "edit.quoteBlock.label": "引用",
    "edit.quoteBlockChanged.label": "引用",
    "edit.teamMemberPermissionChanged.knownTeam": "{teamName} 的成员",
    "edit.teamMemberPermissionChanged.unknownTeam": "未知团队空间的成员",
    "edit.teamOwnerPermissionChanged.knownTeam": "{teamName} 的所有者",
    "edit.teamOwnerPermissionChanged.unknownTeam": "未知团队空间的所有者",
    "edit.templateButtonBlock.label": "模板按钮",
    "edit.templateButtonBlockChanged.label": "模板按钮",
    "edit.unknownAuthor.label": "未知作者",
    "edit.unknownAuthorCommentDiff.label": "未知作者",
    "edit.unknownSpacePermissionTarget.label": "未知",
    "editFormatDiff.pageIcon.label": "页面图标",
    "editProperty.emptyProperty.label": "空",
    "editProperty.relationEditedProperties.moreCount.label":
      "其他 {leftoverCountNumber} 项",
    "emailActivity.accessRequested.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}请求访问{pageName}}}",
    "emailActivity.blockEdited.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}编辑了{pageTitle}}}",
    "emailActivity.collectionCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}创建了{collectionTitle}}}",
    "emailActivity.collectionEdited.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 编辑了 {collectionTitle}}}",
    "emailActivity.collectionPropertyCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中创建了属性{collectionPropertyTitle}}}",
    "emailActivity.collectionPropertyDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中删除了属性{collectionPropertyTitle}}}",
    "emailActivity.collectionPropertyEdited.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中编辑了{collectionPropertyTitle}属性}}",
    "emailActivity.collectionRowCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}已创建{pageTitle}}}",
    "emailActivity.collectionRowDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 删除了 {pageTitle}}}",
    "emailActivity.collectionViewCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中创建了视图{collectionViewTitle}}}",
    "emailActivity.collectionViewDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中删除了视图{collectionViewTitle}}}",
    "emailActivity.collectionViewEdited.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{collectionTitle}中编辑了{collectionViewTitle}视图}}",
    "emailActivity.commentActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 在 {blockName} 留下评论}}",
    "emailActivity.emailEdited.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}将邮箱地址从 {oldEmail} 更改为 {newEmail}}}",
    "emailActivity.mentionActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}在{pageName}提及了你}}",
    "emailActivity.pageDeleted.header":
      "{emailActivity.pageDeleted.header, plural, other {{authorOrAuthors} 永久删除了 {blockTitle}}}",
    "emailActivity.pageLocked.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 锁定了 {blockTitle}}}",
    "emailActivity.pageUnlocked.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 解锁了 {blockTitle}}}",
    "emailActivity.permissionsActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 已加入 {pageOrSpaceName}}}",
    "emailActivity.reminderInActivity.header": "{pageTitle} 中的提醒",
    "emailActivity.restorePermissionsForActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}恢复了{pageOrSpaceName}其继承的访问权限}}",
    "emailActivity.restrictPermissionsForActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}恢复了{pageOrSpaceName}其继承的访问权限}}",
    "emailActivity.topLevelBlockPrivateCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}已创建私人页面{pageTitle}}}",
    "emailActivity.topLevelBlockPrivateDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}已删除私人页面{pageTitle}}}",
    "emailActivity.topLevelBlockWorkspaceCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}已创建工作区页面{pageTitle}}}",
    "emailActivity.topLevelBlockWorkspaceDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 删除了工作区页面 {pageTitle}}}",
    "emailActivity.untitledDatabase.placeholder": "无标题",
    "emailActivity.updatedPermissionsForActivity.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 已更新 {pageOrSpaceName} 的权限}}",
    "emailActivity.userInvitedActivityGroupId.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 将你添加到 {groupName} 群组}}",
    "emailActivity.userInvitedActivityGroupIdByBot.header":
      "你已被添加到{groupName}群组",
    "emailActivity.userInvitedActivityNavigableBlock.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 邀请你到 {blockName}}}",
    "emailActivity.userInvitedActivityNavigableBlockByBot.header":
      "你已被邀请加入{blockName}",
    "emailActivity.userInvitedActivityOtherInvite.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors} 邀请你加入 {spaceName}}}",
    "emailActivity.userInvitedActivityOtherInviteByBot.header":
      "你已被邀请加入{spaceName}",
    "emailActivitySection.authorPhrase.forMoreThanTwoAuthors.label":
      "{numberOfOtherAuthors, plural, other {<b>{firstAuthor}</b>、<b>{secondAuthor}</b>及其他 {numberOfOtherAuthors} 位}}",
    "emailActivitySection.authorPhrase.forNoAuthors.label": "没有人",
    "emailActivitySection.authorPhrase.forOneAuthor.label": "<b>{author}</b>",
    "emailActivitySection.authorPhrase.forTwoAuthors.label":
      "<b>{firstAuthor}<b> 和 {secondAuthor}</b></b>",
    "emailBase.footer.notionDescription":
      "{notionProduct} 是一个集笔记、项目管理、知识库和数据库{br}为一体的全能工作区。",
    "emailBase.tooManyNotifications.message": "太多通知？给我们反馈加以改进",
    "emailBase.unsubscribeFromEmails.prompt": "取消订阅",
    "emailChangeNotificationEmail.emailChanged.headline":
      "你已更改登录 Notion 用的邮箱地址",
    "emailChangeNotificationEmail.emailChanged.message":
      "现在，你可以使用新的邮箱地址 {emailAddress} 登录 Notion。",
    "emailChangeNotificationEmail.emailChanged.subjectLine":
      "你已更改登录用的邮箱地址",
    "emailChangeNotificationEmail.emailChanged.text":
      "你用于登录 Notion 的邮箱地址已被更改为 {newEmail}。如果你没有进行此项更改，请发送电子邮件到 team@makenotion 告知我们。",
    "emailChangeNotificationEmail.unintendedChange.message":
      "如果你没有进行此项更改，请发送电子邮件到 team@makenotion 告知我们。",
    "emailChangeSettings.downgradeEducationPlan.warning.message":
      "更改你的电子邮件可能会将你在免费教育版中的工作区降级为基本免费版。你不会丢失任何数据，但需要升级才能重新访问付费功能。对此有疑问吗？<sendmessagelink>向支持人员发送消息</sendmessagelink>。",
    "emailChangeVerifyEmail.contentsTitle": "更改邮箱地址验证",
    "emailChangeVerifyEmail.copyPasteCode.label":
      "复制并粘贴验证码以验证当前邮箱地址：",
    "emailChangeVerifyEmail.didNotChange.message":
      "如果你没有尝试更改你的 Notion 帐户的邮箱地址，则可以放心地忽略此电子邮件。",
    "emailChangeVerifyEmail.subjectLine":
      "你的更改邮箱地址验证码为 {temporaryPassword}",
    "emailDomain.workspaceCreationSetting.auditLog.unrestricted": "无限制",
    "emailDomain.workspaceCreationSetting.auditLog.workspaceOwnersOnly":
      "仅限工作区所有者",
    "emailEdit.blockDeletedEdit.defaultLabel": "已删除",
    "emailEdit.blockDeletedEdit.factoryLabel": "已删除",
    "emailEdit.bookmarkBlock.label": "书签",
    "emailEdit.bookmarkBlockChanged.label": "书签",
    "emailEdit.bookmarkBlockDeleted.label": "书签",
    "emailEdit.calloutBlock.label": "标注",
    "emailEdit.calloutBlockChanged.label": "标注",
    "emailEdit.calloutBlockDeleted.label": "标注",
    "emailEdit.codeBlockChanged.label": "代码",
    "emailEdit.codeBlockWithLanguageChanged.label": "代码 - {codeLanguage}",
    "emailEdit.collectionBlock.untitled": "无标题",
    "emailEdit.deletedPermissionGroup.label": "已删除的群组",
    "emailEdit.descriptionPropertyChanged.label": "描述",
    "emailEdit.descriptionPropertyCreated.label": "描述",
    "emailEdit.equationBlock.label": "公式",
    "emailEdit.equationBlockChanged.label": "公式",
    "emailEdit.equationBlockDeleted.label": "公式",
    "emailEdit.googleDriveFile.label": "谷歌云端硬盘文件",
    "emailEdit.pageBlock.untitled": "无标题",
    "emailEdit.publishToWebPermissionTarget.label": "发布到网络：",
    "emailEdit.quoteBlock.label": "引用",
    "emailEdit.quoteBlockChanged.label": "引用",
    "emailEdit.quoteBlockDeleted.label": "引用",
    "emailEdit.templateButton.label": "模板按钮",
    "emailEdit.templateButtonChanged.label": "模板按钮",
    "emailEdit.templateButtonDeleted.label": "模板按钮",
    "emailEdit.unknownAuthor.label": "未知作者",
    "emailEdit.unknownAuthorCommentDiff.label": "未知作者",
    "emailEdit.unknownSpacePermissionTarget.label": "未知",
    "emailEditFormatDiff.pageIcon.label": "页面图标",
    "emailEditProperty.emptyProperty.label": "空",
    "emailEditProperty.relationEditedProperties.moreCount.label":
      "其他 {leftoverCountNumber} 项",
    "emailErrors.emailUnreachable.message":
      "我们无法联系到你提供的邮箱地址。请用其他电子邮件重试。",
    "emailErrors.incorrectPassword.message": "密码错误。",
    "emailErrors.invalidEmailAddress.message": "无效的邮箱地址",
    "emailErrors.invalidEmailEntered.message": "请输入有效邮箱地址。",
    "emailErrors.invalidOrExpiredPassword.message":
      "你的登录码不正确，请重试。",
    "emailErrors.noExistingAccountForEmailAddress.message":
      "此邮箱地址没有关联的现有帐户。",
    "emailErrors.userAlreadyExists.message": "使用此邮箱地址的用户已经存在。",
    "embedBlock.actionButton.tooltip.align": "配合",
    "embedBlock.actionButton.tooltip.blockActionMenu": "其他操作",
    "embedBlock.actionButton.tooltip.caption": "标题",
    "embedBlock.actionButton.tooltip.comment": "回帖",
    "embedBlock.actionButton.tooltip.download": "下载",
    "embedBlock.actionButton.tooltip.original": "原稿",
    "embedBlock.captionForLink.button": "标题",
    "embedBlock.embedAnything.placeholder":
      "嵌入任何内容（PDF、谷歌文档、谷歌地图、Spotify 等）",
    "embedBlock.embedButton.label": "嵌入链接",
    "embedBlock.embedTab.title": "嵌入",
    "embedBlock.expandFullScreen.button.label": "展开",
    "embedBlock.invalidLinkError.message": "请输入有效的链接。",
    "embedBlock.linkPrompt.caption":
      "适用于 PDF、谷歌云端硬盘、谷歌地图、CodePen 等…",
    "embedBlock.originalLink.button": "原稿",
    "embedBlock.pastePrompt": "粘贴链接，例如 https://…",
    "embedBlock.viewOriginalLink.button.label": "查看原始内容",
    "embedBlockActions.downloading.label": "正在下载…",
    "embedError.audio.notFound": "找不到此音频。",
    "embedError.audio.offline": "连接网络后查看此音频",
    "embedError.audio.permissionDenied": "没有权限。",
    "embedError.audio.serverError": "无法加载此音频。",
    "embedError.audio.unknown": "无法加载此音频。",
    "embedError.audio.unsupportedContentType":
      "此音频格式（{extension}）无法在此设备上播放。",
    "embedError.embed.notFound": "找不到此嵌入文件。",
    "embedError.embed.offline": "连接网络后查看此嵌入文件",
    "embedError.embed.permissionDenied": "没有权限。",
    "embedError.embed.serverError": "无法加载此嵌入文件。",
    "embedError.embed.unknown": "无法加载此嵌入文件。",
    "embedError.embed.unsupportedContentType":
      "此嵌入格式（{extension}）无法在此设备上播放。",
    "embedError.extension.unknown": "未知",
    "embedError.file.notFound": "找不到此文件。",
    "embedError.file.offline": "连接网络后查看此文件",
    "embedError.file.permissionDenied": "没有权限。",
    "embedError.file.serverError": "无法加载此文件。",
    "embedError.file.unknown": "无法加载此文件。",
    "embedError.file.unsupportedContentType":
      "此文件格式（{extension}）无法在此设备上播放。",
    "embedError.hostnameAndStatusCode": "{hostname}（错误 {statusCode}）",
    "embedError.image.notFound": "找不到此图片。",
    "embedError.image.offline": "连接网络后查看此图片",
    "embedError.image.permissionDenied": "没有权限。",
    "embedError.image.serverError": "无法加载此图片。",
    "embedError.image.unknown": "无法加载此图片。",
    "embedError.image.unsupportedContentType":
      "此图片格式（{extension}）无法在此设备上显示。",
    "embedError.learnMore": "了解更多",
    "embedError.video.notFound": "找不到此视频。",
    "embedError.video.offline": "连接网络后查看此视频",
    "embedError.video.permissionDenied": "没有权限。",
    "embedError.video.serverError": "无法加载此视频。",
    "embedError.video.unknown": "无法加载此视频。",
    "embedError.video.unsupportedContentType":
      "此视频格式（{extension}）无法在此设备上播放。",
    "embedMenu.action.abstract": "嵌入 Abstract 项目",
    "embedMenu.action.audio": "嵌入音频",
    "embedMenu.action.codepen": "嵌入 CodePen",
    "embedMenu.action.createEmbed": "创建嵌入",
    "embedMenu.action.deepnote": "嵌入 Deepnote",
    "embedMenu.action.drive": "嵌入谷歌云端硬盘",
    "embedMenu.action.excalidraw": "嵌入 Excalidraw",
    "embedMenu.action.figma": "嵌入 Figma",
    "embedMenu.action.framer": "嵌入 Framer 原型",
    "embedMenu.action.gist": "嵌入 GitHub Gist",
    "embedMenu.action.hex": "嵌入十六进制",
    "embedMenu.action.image": "嵌入图片",
    "embedMenu.action.invision": "嵌入 Invision 项目",
    "embedMenu.action.loom": "嵌入 Loom",
    "embedMenu.action.maps": "嵌入谷歌地图",
    "embedMenu.action.miro": "嵌入 Miro 画板",
    "embedMenu.action.pdf": "嵌入 PDF",
    "embedMenu.action.replit": "嵌入 Repl",
    "embedMenu.action.sketch": "嵌入 Sketch 文档",
    "embedMenu.action.tweet": "嵌入推文",
    "embedMenu.action.typeform": "嵌入 Typeform",
    "embedMenu.action.video": "嵌入视频",
    "embedMenu.action.whimsical": "嵌入 Whimsical 画板",
    "embedMenu.actions.createBookmark.title": "创建书签",
    "embedMenu.actions.createLinkedDatabase.title": "创建链接数据库",
    "embedMenu.actions.createLinkedViewOfDatabase.title":
      "创建数据库的链接视图",
    "embedMenu.actions.createTransclusion.title": "粘贴并同步",
    "embedMenu.actions.dismiss.title": "取消",
    "embedMenu.actions.linkToPage.title": "链接到页面",
    "embedMenu.actions.mentionBlock.title": "提及块",
    "embedMenu.actions.mentionPage.title": "提及页面",
    "emojiPicker.noResults.message": "无结果",
    "emojiPicker.section.activity": "活动",
    "emojiPicker.section.animals": "动物与自然",
    "emojiPicker.section.callout": "标注",
    "emojiPicker.section.flags": "旗帜",
    "emojiPicker.section.food": "食物与饮料",
    "emojiPicker.section.objects": "物品",
    "emojiPicker.section.people": "人物",
    "emojiPicker.section.recent": "最近",
    "emojiPicker.section.symbols": "符号",
    "emojiPicker.section.travel": "旅行与地点",
    emptyDatabaseViewTitle: "{commaSeparatedDatabaseNames} 视图",
    emptyPageTitle: "无标题",
    "enhancedSidebarFeatureTour.pinPages.actionButton": "了解更多",
    "enhancedSidebarFeatureTour.pinPages.actionText": "了解更多",
    "enhancedSidebarFeatureTour.pinPages.primaryText": "在此整理共享页面",
    "enhancedSidebarFeatureTour.pinPages.secondaryText":
      "将经常访问的页面固定到侧边栏中",
    "enterpriseContactModal.additionalFeedback.placeholder": "想了解什么？",
    "enterpriseContactModal.initial.1000PlusLabel": "超过 1,001 人",
    "enterpriseContactModal.initial.101_1000Label": "101-1,000人",
    "enterpriseContactModal.initial.1_100Label": "1-100人",
    "enterpriseContactModal.initial.caption":
      "我们将与你合作制定你的专属方案。",
    "enterpriseContactModal.initial.companySizeLabel": "公司规模",
    "enterpriseContactModal.initial.emailLabel": "工作电子邮件地址",
    "enterpriseContactModal.initial.header": "联系销售人员",
    "enterpriseContactModal.initial.nameLabel": "你的名字",
    "enterpriseContactModal.initial.questionLabel": "你的问题",
    "enterpriseContactModal.initial.sendLabel": "发送",
    "enterpriseContactModal.selectQuestion.label": "选择问题",
    "enterpriseContactModal.thanks.caption":
      "我们已收到你的询问，并将很快通过电子邮件与你联系。",
    "enterpriseContactModal.yourQuestion.title": "你的问题",
    "enterpriseContactModalQuestionSelect.question.live_demo": "安排现场演示",
    "enterpriseContactModalQuestionSelect.question.other": "其他",
    "enterpriseContactModalQuestionSelect.question.plan_help":
      "选择方案时需要帮助",
    "enterpriseContactModalQuestionSelect.question.setup_trial":
      "设置企业试用版",
    "enterpriseMembersSettingsPrompt.caption":
      "成员资格管理员可以向工作区和组添加人员以及从中删除人员。他们无法访问其他管理员设置。",
    "enterpriseMembersSettingsPrompt.cta": "管理成员",
    "enterpriseMembersSettingsPrompt.learnMore.button": "了解更多",
    "enterpriseMembersSettingsPrompt.title": "用于成员管理的新管理员访问权限",
    "equationBlock.actions.tooltip": "重命名、删除等…",
    "equationBlock.empty.placeholder": "添加一个 TeX 公式",
    "equationInput.inputError.label": "无效的公式：",
    "equationInput.inputError.learnMore": "了解更多",
    "equationInput.submitButton.label": "完成",
    "evernoteActions.authenticatingWithEvernote.loadingMessage":
      "Evernote 授权中…",
    "evernoteActions.loginPopupModal.title": "印象笔记国际版（Evernote）登录",
    "evernoteImportOption.actionsMenu.connectAnotherAccount": "绑定另一个帐户",
    "evernoteImportOption.actionsMenu.import": "导入",
    "evernoteImportOption.actionsMenu.learnMore": "了解更多信息",
    "evernoteImportOption.actionsMenu.removeIntegration": "移除",
    "evernoteImportOption.caption.getCredit": "导入即可赚取 US$5 的积分",
    "evernoteImportOption.search.noResultsPlaceholder": "无笔记本",
    "evernoteImportOption.search.placeholder": "搜索笔记本…",
    "excalidrawBlock.embeds.button.label": "嵌入 Excalidraw",
    "excalidrawBlock.embeds.caption": "适用于 Excalidraw 白板。",
    "excalidrawBlock.placeholder": "嵌入 Excalidraw",
    "export.csvHeader.email": "邮箱地址",
    "export.csvHeader.id": "ID",
    "export.csvHeader.name": "名称",
    "export.csvHeader.permissionGroups": "权限群组",
    "export.csvHeader.role": "角色",
    "export.exportPartitioned.message":
      "由于文件较大，导出仍在进行中。我们将向您发送电子邮件告知进度。",
    "export.linkToPage.untitledPagePlaceholder": "无标题",
    "export.markdown.untitledDatabase.placeholder": "无标题",
    "export.userPermissionsRole.admin.message": "管理员",
    "export.userPermissionsRole.guest.message": "访客",
    "export.userPermissionsRole.member.message": "成员",
    "export.userPermissionsRole.membershipAdmin.message": "成员资格管理员",
    "export.userPermissionsRole.workspaceOwner.message": "工作区所有者",
    "exportActions.auditLog.exporting.EmailMessage":
      "当前正在生成你的 CSV 导出文件。生成的 CSV 与实时审计日志相比有 2 小时的延迟。导出成功后，将向你发送一封包含下载链接的电子邮件。",
    "exportActions.exportFailedError.message": "导出失败。",
    "exportActions.exporting.loadingMessage": "导出中",
    "exportAuditLog.error.internal": "发生内部错误。",
    "exportAuditLog.error.spaceError":
      "你不是该空间的管理员，或者该空间不存在。",
    "exportAuditLog.header.activity": "活动",
    "exportAuditLog.header.activityType": "活动类型",
    "exportAuditLog.header.audience": "观众",
    "exportAuditLog.header.city": "城市",
    "exportAuditLog.header.country": "国家",
    "exportAuditLog.header.dateAndTime": "日期和时间 (UTC)",
    "exportAuditLog.header.email": "邮箱地址",
    "exportAuditLog.header.ipAddress": "IP 地址",
    "exportAuditLog.header.name": "名称",
    "exportAuditLog.header.pageId": "页面 ID",
    "exportAuditLog.header.platform": "平台",
    "exportAuditLog.header.state": "州",
    "exportAuditLog.header.status": "状态",
    "exportAuditLogCSVEmail.exportCustomerSupport.text":
      "请联系你的客服经理或客服寻求更多帮助。",
    "exportAuditLogCSVEmail.exportEmailText":
      "你的 Notion Audit Log CSV 导出已完成：{downloadURL}",
    "exportAuditLogCSVEmail.exportReady.text":
      "你的 Notion Audit Log CSV 导出已完成",
    "exportAuditLogCSVEmail.exportSubjectLine":
      "你的 Notion Audit Log CSV 导出已完成",
    "exportAuditLogCSVEmail.exportWithErrors.text":
      "很抱歉，为以下日期生成此报告时出错：",
    "exportCSVEmail.downloadLinkPrompt":
      "点击<downloadlink>此处</downloadlink>下载。该链接将在 7 天后过期。",
    "exportEmail.downloadLinkPrompt":
      "点击<downloadlink>此处</downloadlink>下载。该链接将在 30 天后过期。",
    "exportHelpers.unknownFilePlaceholderTitle": "未知文件",
    "exportHelpers.untitledPagePlaceholderTitle": "无标题",
    "exportModal.cancelButton.label": "取消",
    "exportModal.closeButton.label": "关闭",
    "exportModal.exportButton.label": "导出",
    "exportModal.exportFormat.description": "导出格式",
    "exportModal.exportFormatButton.html.label": "HTML",
    "exportModal.exportFormatButton.markdownAndCSV.label": "Markdown 和 CSV",
    "exportModal.exportFormatButton.pdf.label": "PDF",
    "exportModal.flattenExportFiletree.description": "为子页面创建文件夹",
    "exportModal.includeContentTypes.everything.label": "所有内容",
    "exportModal.includeContentTypes.no_files.label": "没有文件或图像",
    "exportModal.includeContents.description": "要包括的内容",
    "exportModal.includeDatabases.all.label": "所有内容",
    "exportModal.includeDatabases.currentView.label": "当前视图",
    "exportModal.includeDatabases.description": "包括数据库",
    "exportModal.includeSubpages.label": "含子页面",
    "exportModal.offlineMessage.description": "请连接网络后导出。",
    "exportModal.pageFormat.description": "页面格式",
    "exportModal.pageFormatButton.a3.label": "A3",
    "exportModal.pageFormatButton.a4.label": "A4",
    "exportModal.pageFormatButton.legal.label": "Legal",
    "exportModal.pageFormatButton.letter.label": "Letter",
    "exportModal.pageFormatButton.tabloid.label": "Tabloid",
    "exportModal.pageScale.description": "比例百分比",
    "exportModal.pageScale.invalidScaleError":
      "比例百分比必须是 10 到 200 之间的数字",
    "exportModal.pdfSubpageUpgradeTooltip.caption":
      "创建一个 zip 归档，其中包含嵌套在当前页面中的所有子页面的 PDF 文件。",
    "exportModal.pdfSubpageUpgradeTooltip.title":
      "升级以在 PDF 导出中包含子页面",
    "exportModal.title": "导出",
    "exportModal.workspacePdfUpgradeTooltip.caption":
      "创建一个 zip 归档，其中包含工作区中的所有页面的 PDF 文件。",
    "exportModal.workspacePdfUpgradeTooltip.title":
      "升级以将工作区导出为 PDF 文件",
    "exportPreview.error.message": "错误",
    "exportPreview.loading.message": "载入中…",
    "exportProgressDialog.closeButton.label": "关闭",
    "exportProgressDialog.emailMessage":
      "我们还将向你发送包含下载链接的电子邮件。",
    "exportProgressDialog.exportStartedMessage": "导出中…",
    "exportProgressDialog.exportedPagesMessage":
      "{pagesExported, plural, other {已导出 {pagesExported} 页}}",
    "exportProgressEmail.emailText":
      "我们正在处理您的数据导出请求。我们目前已导出 {exportedPageCount} 个页面。导出完成后，我们会向您发送电子邮件通知。",
    "exportProgressEmail.subjectLine": "Notion 工作区导出正在进行中",
    "exportRenderer.titleOfBlock.untitled": "无标题",
    "exportRenderer.titleOfDatabase.untitled": "无标题数据库",
    "exportRenderer.titleOfNewProperty.property": "属性",
    "exportResultEmail.emailText":
      "点击<downloadlink>此处</downloadlink>下载。该链接将在 30 天后过期。",
    "exportResultEmail.subjectLine": "你的 Notion 导出已准备就绪",
    "export_audit_log_rate_limited.message":
      "已达到导出审计日志的速率限制，请在当前导出完成后重试。",
    "externalIntegrationAuthActions.authenticationWithIntegration.loadingMessage":
      "通过集成进行授权…",
    "externalIntegrationAuthActions.loginWithExternalIntegrationPopupModal.title":
      "身份验证",
    "externalObjectBlock.errorDropdown.copiedDebuggingInfo": "已复制到剪贴板。",
    "externalObjectInstance.bodyAttribute.moreLabel": "更多",
    "externalObjectInstance.bodyAttribute.showLessLabel": "显示更少",
    "externalObjectInstanceBlock.editLabel.message": "链接预览",
    "externalObjectInstanceBlock.placeholder.message": "嵌入 {value}",
    "externalObjectInstanceBlockErrorDropdown.dialogItem.copyDebugData":
      "复制调试信息",
    "externalObjectInstanceBlockErrorDropdown.dialogItem.reviewGuide":
      "查看指南",
    "externalObjectInstanceEmbedPreview.expandButton.label": "展开",
    "factoryBlock.buttonName.subtitle": "这个按钮该叫什么？",
    "factoryBlock.buttonName.title": "按钮名称",
    "factoryBlock.configureButton.label": "配置模板按钮",
    "factoryBlock.configureMenu.closeButton.label": "关闭",
    "factoryBlock.configureTemplate.button.label": "配置模板",
    "factoryBlock.emptyTemplate.placeholder": "空。拖动块到这里…",
    "factoryBlock.moreActions.button.label": "更多动作…",
    "factoryBlock.newItem.button.label": "添加新项目",
    "factoryBlock.newItem.button.placeholder": "添加新项目",
    "factoryBlock.templateArea.subtitle.":
      "将每次点击模板按钮时要复制的块拖动到这里。",
    "factoryBlock.templateArea.title": "模板",
    "faq.addingAndRemovingMembers.answer":
      "<p>无论你是按月还是按年结算，如果添加或删除成员，都可能每月向你的帐户收费。如果你添加了成员，则将根据每位成员被添加时剩余的计费周期百分比，按比例向你的帐户收取费用。如果你删除了成员，将以同样的方式返还余额到你的帐户。</p>",
    "faq.addingAndRemovingMembers.question": "如何添加和删除成员？",
    "faq.advancedPermissions.answer":
      "<p>在免费的团队试用版中，你可以在页面上将访问权限设置为“全部权限”、“可以查看”或“可以评论”。“全部权限”是指该人员可以编辑、评论、并与他人分享页面。</p> <p>在付费团队版和企业版中，你可以向其他用户授予“可以编辑”访问权限，这样受邀人员可以在页面上进行编辑和评论，但不能与他人分享。如果你不希望你的内容泄漏到团队之外，这将特别有用。</p> <p> <contactsales>联系销售以了解更多</contactsales> </p>",
    "faq.advancedPermissions.question": "付费团队版和企业版提供哪些高级权限？",
    "faq.cancelPlan.answer":
      "<p>你的 Notion 订阅（年付或月付）将自动续订，直到你取消为止。你可以在电脑左侧边栏“设置与成员”中选择“定价方案”，然后选择“降级”来取消订阅。取消后，你仍可以使用所有付费功能，直到结算周期结束。</p><p><billingandpaymentlink>更多关于账单和支付的信息在这里</billingandpaymentlink></p>",
    "faq.cancelPlan.question": "如何取消我的付费方案？",
    "faq.changePaymentMethod.answer":
      "<p>你可以随时在账单设置中更改付款方式。</p>",
    "faq.changePaymentMethod.question": "我可以更改付款方式吗？",
    "faq.changePlans.answer":
      "<p>升级或降级方案的工作原理与添加和删除成员相似。系统会根据更改方案时剩余的结算周期百分比来向你的帐户收费或返还余额。</p>",
    "faq.changePlans.question": "更改方案时会发生什么？",
    "faq.deleteBlocks.answer":
      "<p>当然！与你手机或电脑上的存储限制一样，如果删除一些内容，就会释放更多空间。</p>",
    "faq.deleteBlocks.question": "我可以删除块来释放存储空间吗？",
    "faq.freeVsPersonalAndTeam.answer":
      "<p>最大的区别在于如何与他人合作。</p> <p>免费个人版专为个人使用量身设计，最多可容纳 5 位不同的访客。这些访客可以是你的朋友、家人、以及其他你邀请到页面的人。你还可以将页面公开分享到网络，并打开评论或编辑权限。在页面右上方的“分享”菜单中，依次打开“分享到网络”和“允许编辑”后，任何拥有页面链接的 Notion 用户便可编辑你的页面。</p> <p>在个人专业版，你可以邀请无限的访客进行协作。例如，如果你经营自己的公司，则可以邀请所有客户为你提供工作的反馈。</p> <p>在团队版，你可以将固定成员添加到工作区中，以便大家共享和处理内容。团队版还具有更多的权限和管理员控制，这样你和你的团队可以安全地一起工作。更多详细信息，请参阅定价方案比较表。</p>",
    "faq.freeVsPersonalAndTeam.question":
      "免费个人版、个人专业版和团队版有什么不同？",
    "faq.howToApplyCredit.answer":
      "<p>要使用积分，你必须先升级到任何付费方案。在升级过程中，你可以选择将部分或全部帐户积分应用于新方案。</p>",
    "faq.howToApplyCredit.question": "如何将积分应用于工作区？",
    "faq.howToEarnCredit.answer":
      "<p>你可以通过在不同设备上使用 Notion 并尝试新功能来赚取积分。请前往“设置与成员”中的“赚取积分”选项卡以了解更多。</p>",
    "faq.howToEarnCredit.question": "如何赚取积分？",
    "faq.importStorageLimit.answer":
      "<p>通过导入创建的内容不计入工作区的存储限制。我们希望确保你尽可能顺利地开始使用 Notion。</p>",
    "faq.importStorageLimit.question":
      "如果我正在使用团队试用版，从其他应用导入内容会如何影响我的块存储限制？",
    "faq.mandatoryRefund.answer":
      "<p>如果您居住在欧盟、英国或其他适用强制性退款政策的地区，您甚至可以在72小时后退还您的月度订阅费。例如，欧盟的客户可以在14天内(而不是购买后72小时)全额退还每月订阅费。</p><p>请在应用内查询退款请求，或发送电子邮件至team@makenotion.com。如果您居住在适用强制性退款政策的地区，请告知我们，我们将竭诚为您提供帮助。</p>",
    "faq.mandatoryRefund.question":
      "如果居住在适用强制性退款政策的地区，会发生什么情况？",
    "faq.maximumEarnedCredit.answer":
      "<p>是的，最多可以赚取 {maximumAmountInDollars} 的积分。</p>",
    "faq.maximumEarnedCredit.question": "赚取的积分有上限吗？",
    "faq.monthlyAndYearlyBilling.answer":
      "<p>是的！我们提供月付和年付方案，年付更便宜（大概可以省 20％）。举个例子，当你选择月付方案，团队版为每位成员每月 US$10，但如果选择年付方案，则每位成员每月 US$8。</p>",
    "faq.monthlyAndYearlyBilling.question": "有月付和年付的选项吗？",
    "faq.multipleTeams.answer":
      "<p>可以！你可以使用同一个电子邮件地址创建并加入多个团队。但是，每一个工作区拥有它自己的定价方案，需要单独升级。</p>",
    "faq.multipleTeams.question": "我可以在 Notion 上隶属于多个团队吗？",
    "faq.overGuestLimitInFreePlan.answer":
      "<p>你可以升级到没有访客限制的个人专业版。如果你经常和同一组人一起协作，则可升级为团队版。你还可以在“设置与成员”中查看和移除不活动的访客。</p>",
    "faq.overGuestLimitInFreePlan.question":
      "当我超出个人版的访客限制时会发生什么？",
    "faq.overStorageLimitInFreePlan.answer":
      "<p>你仍然可以像往常一样读取、编辑和组织现有内容块，但无法添加新的内容块。</p><p> 你可以删除现有内容块以释放存储空间。</p>",
    "faq.overStorageLimitInFreePlan.question":
      "当我超出团队试用版的块存储限制时会发生什么？",
    "faq.paymentFailure.answer":
      "<p>付款失败后，系统会通过邮件通知你。在账单逾期的第一个月，系统会最多重试 4 次付款。此后，如果付款失败，你将被降级为免费版。</p>",
    "faq.paymentFailure.question":
      "如果付款失败会发生什么？比如我的信用卡过期了？",
    "faq.paymentProcessor.answer":
      "<p>我们使用 Stripe 处理你的付款。Stripe 是 Twitter、Pinterest 和 Lyft 等产品的支付提供商。我们不会直接处理你的信用卡信息。</p>",
    "faq.paymentProcessor.question": "我的付款是如何处理的？",
    "faq.personalPricing.answer":
      "<p>如果你将工作区升级到个人专业版，将需支付固定费用（每月 US$5 或每年 US$48）。</p><p>访客完全免费，但一次只能添加到一个页面。</p>",
    "faq.personalPricing.question": "如何计算个人专业版的定价？",
    "faq.refund.answer":
      "<p>我们的退款政策很简单。如果你认为你在网页或应用内订阅 Notion 付费方案时出了差错，请在应用内联系我们或发送电子邮件到 team@makenotion.com。如果你在订阅月付方案的 72 小时内或订阅年付方案的 30 天内降级，我们很乐意全额退款（不按比例）。</p><p>如果你出于任何原因对 Notion 不满意，请通过 team@makenotion.com 告诉我们──我们很乐意听取你的反馈，合作共创最好的使用体验。</p>",
    "faq.refund.question": "退款如何运作？",
    "faq.runOutOfCredit.answer":
      "<p>如果积分用完了，则会通过你提供的付款方式向你的帐户收取费用。</p>",
    "faq.runOutOfCredit.question": "如果我的积分用完了会发生什么？",
    "faq.serviceLevelAgreement.answer":
      "<p>我们不提供标准 SLA。对于成员超过 100 人的团队，我们可以提供定制 SLA。</p><p><contactsales>请联系销售以了解更多</contactsales></p>",
    "faq.serviceLevelAgreement.question": "你们有服务级别协议 (SLA) 吗？",
    "faq.studentDiscount.answer":
      "<p>个人专业版对学生和教育工作者是免费的。如果你是学生或教育工作者，就可和无限访客进行协作、使用版本历史记录等专业版功能。只需使用你的学校邮箱地址进行注册，即可获得这些功能。</p><p>如果你已经升级到个人专业版，请将与你的帐户关联的邮箱地址更改为学校的邮箱地址，以免费获得个人专业版。如果你之前已经在使用我们的旧版免费教育版，则会自动升级到个人专业版。</p><p><helpcenterlink>请前往帮助中心了解更多。</helpcenterlink></p>",
    "faq.studentDiscount.question": "你们给学生提供任何优惠吗？",
    "faq.teamAdminTools.answer":
      "<p>在免费的团队试用版中，工作区中的每位成员都是管理员。这意味着任何人都可以更改团队设置并邀请其他人进入工作区。</p><p>如果你只想让少数人具有管理员权限，我们建议你升级到完整的团队版。它附带的工具可以让你区分管理员和普通成员。成员无法编辑帐单信息或安全选项，也无法在工作区之外共享内容。</p>",
    "faq.teamAdminTools.question": "团队版随附哪些管理员工具？",
    "faq.teamPricing.answer":
      "<p>如果你将工作区升级到团队版，则会向每位成员将收取费用（每人每月 US$10 或每年 US$96）。例如，如果你使用月付方案，并有 5 位成员，则每月收取 US$50。</p><p>访客完全免费，但他们只能访问被邀请的特定页面。也就是说，访客不能看到侧边栏中的“工作区”分区内容。</p>",
    "faq.teamPricing.question": "如何计算团队版的定价？",
    "faq.teamTrial.answer":
      "<p>当系统在注册过程中询问你如何设置 Notion 时，选择“团队”，你将自动加入团队试用版。你将可以使用付费团队版的大多数功能，但块存储限制为 1,000 个。如果你的团队想要添加更多内容，请升级到完整的团队版。上文有详细说明。</p>",
    "faq.teamTrial.question": "如何免费试用团队版？",
    "faq.useNotionForFree.answer":
      "<p>的确如此！Notion 可以无限期免费使用。</p><p>个人版供个人完全免费使用。团队版有 1,000 个块可供免费试用，足够你的团队在升级前试用 Notion。</p>",
    "faq.useNotionForFree.question": "我可以免费使用 Notion 吗？",
    "faq.whatIsABlock.answer":
      "<p>块是你添加到页面的任何单个内容，如文本段落、待办事项、图片、代码块、嵌入文件等。一个页面是由这些块构建的。</p>",
    "faq.whatIsABlock.question": "什么是块？",
    "faq.whyBillingInformation.answer":
      "<p>即使你使用了足够的积分来支付第一笔帐单，我们仍需要你的付款信息，因为在将来积分用尽时，可保障你的帐户正常续费。</p>",
    "faq.whyBillingInformation.question":
      "如果我有足够积分来支付 Notion，为什么还需要我的付款信息？",
    "faqList.moreQuestionsTextHelpCenter":
      "还有其他问题吗？在我们的<messagelink>帮助中心</messagelink>了解更多信息。",
    "faqList.moreQuestionsTextIntercom":
      "还有其他问题吗？<messagelink>给我们发送消息</messagelink>",
    "figmaBlock.caption": "适用于启用了公共访问的 Figma 链接",
    "figmaBlock.placeholder": "嵌入 Figma",
    "fileBlock.embedButton.label": "嵌入链接",
    "fileBlock.fileTab.title": "文件",
    "fileBlock.invalidLinkError.message": "请输入有效的链接。",
    "fileBlock.linkPrompt.caption":
      "适用于 PDF、谷歌云端硬盘、谷歌地图、CodePen 等…",
    "fileBlock.linkPrompt.placeholder": "粘贴文件链接…",
    "fileBlock.uploadOrEmbed.placeholder": "上传或嵌入文件",
    "filePropertyMenu.header": "文件",
    "filePropertyMenu.uploadFileFailedError.message": "上传失败。",
    "fileUploadErrors.freePlanFileSizeExceeded.message":
      "你的文件超过免费版的 5MB 限制。",
    "filtersIntroTooltip.subtitle":
      "在共享视图中，在你保存之前，筛选器和排序不会影响其他人。",
    "filtersIntroTooltip.title": "保存筛选器和排序",
    "flattenedAppTemplates.tasks.taskByProjectViewName": "特定于项目的任务",
    "forkPageActions.loadingStateDisplayText":
      "正在将“{blockTitle}”的副本保存到“{spaceTitle}”…",
    "forkPageActions.untitledBlockRecordTitle": "无标题",
    "forkPageActions.untitledSpaceRecordTitle": "无标题",
    "forkPageScreen.chooseWorkspace.message": "选择工作区",
    "formHandler.submitButton.create.label": "提交",
    "formHandler.submitButton.create.update": "保存更改",
    "formInputIcon.uploadButton.label": "上传图片",
    "formSecretShow.copied.label": "已复制",
    "formSecretShow.copySecret.label": "拷贝",
    "formSecretShow.copySecret.tooltip": "拷贝 {secretName}",
    "formSecretShow.refreshSecret.label": "刷新",
    "formSecretShow.secretCopied.tooltip": "{secretName} 已复制",
    "formSecretShow.showSecret.label": "显示",
    "formatMessage.error.undefinedResultType": "未定义",
    "formulaHelpers.error.branchCondition":
      "条件的每个分支必须属于同一类型： {input}",
    "formulaHelpers.error.circularDependency":
      "属性 {propertySchemaName} 创建了循环依赖项。",
    "formulaHelpers.error.illegalConstant": "非法常量： {value}",
    "formulaHelpers.error.invalidPropertyReference": "无效的属性引用： {input}",
    "formulaHelpers.error.invalidSyntax": "无效的语法： {input}",
    "formulaHelpers.error.noSignatureForFunction":
      "未找到函数的签名： {functionName}",
    "formulaHelpers.error.propertyNotFound": "未找到属性：prop({input})",
    "formulaHelpers.error.tooFewArguments": "函数 {functionName} 中的参数太少",
    "formulaHelpers.error.tooFewArgumentsVariadic":
      "函数 {functionName} 中的参数太少",
    "formulaHelpers.error.tooManyArguments": "函数 {functionName} 中的参数过多",
    "formulaHelpers.error.tooManyArgumentsInProp": "传递给 prop() 的参数过多。",
    "formulaHelpers.error.typeMismatch":
      "类型不匹配 {nodeString} 不是 {localizedPropertyTypeDisplayName}。",
    "formulaHelpers.error.undefinedConstant": "未定义的常量： {constantName}",
    "formulaHelpers.error.undefinedFunction": "未定义的函数： {functionName}",
    "formulaHelpers.error.undefinedOperator": "未定义的运算符： {operator}",
    "formulaPropertyMenu.learnMore.button.label": "了解函数",
    "frame.importingMessage": "导入中…",
    "framerBlock.embedFramer.button.label": "嵌入 Framer",
    "framerBlock.linkInput.caption": "适用于 Framer 原型",
    "framerBlock.placeholder": "嵌入 Framer 原型",
    "frontPricingCard.businessPlan.context.allBusinessPlanFeatures":
      "团队版的全部功能，以及",
    "frontPricingCard.businessPlan.oneliner": "适用于多个或大型团队；小型公司",
    "frontPricingCard.businessPlan.title": "商业版",
    "frontPricingCard.comingSoonBadge": "即将推出",
    "frontPricingCard.educationPlan.attribute.contentApi.v2": "API",
    "frontPricingCard.educationPlan.attribute.shareWithGuests": "无限访客",
    "frontPricingCard.educationPlan.attribute.unlimitedFileUploads":
      "无限文件上传",
    "frontPricingCard.educationPlan.attribute.versionHistory": "版本历史",
    "frontPricingCard.educationPlan.context.allPersonalPlanFeatures":
      "个人版的全部功能，以及",
    "frontPricingCard.enterprisePlan.attribute.advancedSecurity":
      "高级安全控制",
    "frontPricingCard.enterprisePlan.attribute.auditLog": "审计日志",
    "frontPricingCard.enterprisePlan.attribute.customContractInvoicing":
      "定制合同",
    "frontPricingCard.enterprisePlan.attribute.dedicatedManager":
      "专属客户成功经理（超过 100 个席位）",
    "frontPricingCard.enterprisePlan.attribute.scimApi": "用户管理分配（SCIM）",
    "frontPricingCard.enterprisePlan.attribute.sso": "SAML 单点登录",
    "frontPricingCard.enterprisePlan.attribute.unlimitedVersionHistory":
      "无限的版本历史",
    "frontPricingCard.enterprisePlan.context.allBusinessPlanFeatures":
      "商业版的全部功能，以及",
    "frontPricingCard.enterprisePlan.context.allTeamPlanFeatures":
      "团队版的全部功能，以及",
    "frontPricingCard.enterprisePlan.oneliner": "运转公司所需的控制和支持。",
    "frontPricingCard.enterprisePlan.title": "企业版",
    "frontPricingCard.evernotePremiumComparison.attribute.notes": "笔记",
    "frontPricingCard.evernotePremiumComparison.attribute.reminders": "提醒",
    "frontPricingCard.evernotePremiumComparison.attribute.tags": "标签",
    "frontPricingCard.evernotePremiumComparison.attribute.twoLevelHierarchy":
      "两级层级",
    "frontPricingCard.evernotePremiumComparison.attribute.webClipper":
      "网页剪裁器",
    "frontPricingCard.evernotePremiumComparison.oneliner": "基本笔记",
    "frontPricingCard.evernotePremiumComparison.title": "Evernote 付费版",
    "frontPricingCard.freePlan.attribute.shareWithGuests": "与 5 位访客分享",
    "frontPricingCard.freePlan.attribute.syncAcrossDevices": "跨设备同步",
    "frontPricingCard.freePlan.attribute.unlimitedBlocks": "无限页面和块",
    "frontPricingCard.freePlan.context.freeForIndividuals": "个人使用免费",
    "frontPricingCard.personalFreePlan.oneliner": "整理你生活的每一个角落。",
    "frontPricingCard.personalFreePlan.title": "个人版",
    "frontPricingCard.personalPlan.attribute.limitedVersionHistory":
      "30 天版本历史",
    "frontPricingCard.personalPlan.context.allPersonalPlanFeatures":
      "个人版的全部功能，以及",
    "frontPricingCard.personalPlanComparison.attribute.databases": "数据库",
    "frontPricingCard.personalPlanComparison.attribute.infiniteHierarchy":
      "无限层级",
    "frontPricingCard.personalPlanComparison.attribute.markdownSupport":
      "Markdown 支持",
    "frontPricingCard.personalPlanComparison.attribute.realTimeCollaboration":
      "实时协作",
    "frontPricingCard.personalPlanComparison.oneliner":
      "整理你生活的每一个角落。",
    "frontPricingCard.personalPlanComparison.title": "Notion 个人版",
    "frontPricingCard.personalProPlan.oneliner":
      "适用于想要执行更多操作的高级用户。",
    "frontPricingCard.personalProPlan.title": "个人专业版",
    "frontPricingCard.startupPlan.context.allProPlanFeatures":
      "专业版的全部功能，以及",
    "frontPricingCard.teamPlan.attribute.adminTools": "管理员工具",
    "frontPricingCard.teamPlan.attribute.advancedPermissions": "高级权限",
    "frontPricingCard.teamPlan.attribute.collaborativeWorkspace": "协作工作区",
    "frontPricingCard.teamPlan.attribute.sharingPermissions": "共享权限",
    "frontPricingCard.teamPlan.attribute.unlimitedMembers": "无限团队成员",
    "frontPricingCard.teamPlan.context.allProPlanFeatures":
      "专业版的全部功能，以及",
    "frontPricingCard.teamPlan.oneliner": "让团队在同个地方协作。",
    "frontPricingCard.teamPlan.title": "团队版",
    "frontSignupComponent.emailInput.educationEmailPlaceholder":
      "输入你的学校邮箱地址...",
    "frontSignupComponent.emailInput.genericEmailPlaceholder":
      "输入你的邮箱地址...",
    "frontSignupComponent.emailInput.teamEmailPlaceholder":
      "输入你的工作邮箱地址...",
    "frontSignupComponent.submitButton.label": "注册",
    "fullPageError.accessNotAllowed.message":
      "你无权访问{workspaceName}。请与管理员联系以将你添加为成员。",
    "fullPageError.backToMyContentButton.label": "回到我的内容",
    "fullPageError.canRequestAccess.message":
      "如果有人批准你的请求，你则可以访问此页面。",
    "fullPageError.canRequestAccess.title": "无权访问此页面。",
    "fullPageError.cannotRequestAccess.message":
      "此页面不存在，或者你没有访问此页面的权限。",
    "fullPageError.contentDoesNotExist.message":
      "遇到麻烦？<helplink>向支持人员发送消息</helplink>",
    "fullPageError.contentDoesNotExist.title": "此内容不存在",
    "fullPageError.createOrJoinWorkspaceButton.label": "创建或加入工作区",
    "fullPageError.downloadMobileAppButton.label": "获取移动应用",
    "fullPageError.loggedOut.message": "欢迎访问 Notion 上的{workspaceName}。",
    "fullPageError.noAccess.title": "未找到页面",
    "fullPageError.offlineError.message":
      "哎呀，你好像离线了。请连接网络查看此页面。",
    "fullPageError.openInMobileAppButton.label": "在移动应用中开启",
    "fullPageError.pageIsPrivate.message":
      "这是{workspaceName}的私有页面。{hasOwner, select, true {请联系{ownerName}（ {ownerEmail} ）邀请你进行协作。}other{请与页面所有者联系以邀请你进行协作。}}",
    "fullPageError.publicDomainInterstitial.title":
      "跟踪以下链接继续访问外部站点",
    "fullPageError.reportAProblem.label": "报告问题",
    "fullPageError.requestAccessButton.label": "申请访问权限",
    "fullPageError.requestAccessButton.requested": "已申请访问权限",
    "fullPageError.returnToOnboardingButton.label": "回到引导流程",
    "fullPageError.sendMessageButton.label": "向支持人员发送消息",
    "fullPageError.sendMessageForHelp.message":
      "<sendmessagelink>向支持人员发送消息</sendmessagelink>以寻求帮助。",
    "fullPageError.somethingWrong.label": "出了什么问题？",
    "fullPageError.termsAndPrivacyButton.label": "条款",
    "fullPageError.unsafePageError.message":
      "此页面可能包含垃圾邮件、网络钓鱼、非法或不当内容。如果你从未知来源收到此链接，建议你关闭此标签页。<proceedanywaylink>仍然继续</proceedanywaylink>",
    "fullPageError.unsafePageError.title": "此页面被标记为不安全",
    "fullPageError.whatIsNotionButton.label": "什么是 Notion？",
    "fullPageError.wrongAccount.message":
      "你可能需要使用其他邮箱地址<loginlink>登录</loginlink> ，或与页面所有者联系以请求访问。",
    "fullPageError.wrongAccountRequestAccess.message":
      "你可能需要使用其他邮箱地址<loginlink>登录</loginlink>。",
    "fullPageError.wrongAccountRequestAccessSwitchAccount.message":
      "你可能需要<switchlink>切换帐户</switchlink>或使用其他邮箱地址<loginlink>登录</loginlink>。",
    "fullPageError.wrongLoggedInUserError.message":
      "你当前以 {currentlyLoggedInUser} 登录",
    "fullscreenRenderer.closeButton.label": "关闭",
    "genericDialogModal.cancelButton.label": "取消",
    "genericErrors.genericErrorMessage": "出了些问题。",
    "gistBlock.embedButton.label": "嵌入 Gist",
    "gistBlock.linkInput.caption": "适用于 Github 上的 Gist 链接",
    "gistBlock.placeholder": "嵌入 Gist",
    "githubGistRenderer.errorLoading.message": "载入 Gist 时出错",
    "githubGistRenderer.loading.message": "载入 Gist 中…",
    "googleAuthPromptModal.connectToGoogleButton.label": "绑定谷歌帐户",
    "googleAuthPromptModal.mobileUseDesktopPrompt.errorMessage":
      "请在电脑上的 Notion 绑定新帐户。",
    "googleAuthPromptModal.noAccessFile.errorMessage":
      "Notion 无法访问你要嵌入的谷歌云端硬盘文件。",
    "googleAuthPromptModal.seeConnectedAccountsButton.label":
      "查看我的绑定帐户",
    "googleDriveActions.authenticatingWithGoogle.loadingMessage": "谷歌授权中…",
    "googleDriveActions.loginWithGoogleModal.title": "谷歌登录",
    "googleDriveBlock.embedTab.caption": "适用于谷歌云端硬盘中的任何文件",
    "googleDriveBlock.embedTab.embedButton.label": "嵌入谷歌云端硬盘中的文件",
    "googleDriveBlock.legacy.placeholder": "嵌入谷歌云端硬盘的文件",
    "googleDriveBlock.legacyLinkInput.caption": "适用于谷歌文档、谷歌表格等。",
    "googleDriveBlock.mediaMenuActions.embedTab.title": "嵌入",
    "googleDriveBlock.mediaPicker.googleDriveTab.title": "浏览谷歌云端硬盘",
    "googleDriveBlock.pageDeleted.caption": "此文件位于垃圾箱中。",
    "googleDriveBlock.pageDescription":
      "{hasUserName, select, true {由{userName}} other {}}上次修改于{hasLastModifiedTime, select, true {{lastModifiedTime}} other {}}",
    "googleDriveBlock.placeholder.authenticated":
      "选择要从谷歌云端硬盘嵌入的文件",
    "googleDriveBlock.placeholder.notAuthenticated":
      "将 Google 云端硬盘连接到 Notion 以嵌入文件",
    "googleDriveHelpers.untitledFilePlaceholder": "无标题",
    "googleErrors.googleDriveTokenError":
      "来自谷歌云端硬盘的错误：{errorMessage}",
    "googleMapsBlock.embed.caption": "适用于谷歌地图上的任何地点",
    "googleMapsBlock.embedButton.label": "嵌入地图",
    "googleMapsBlock.placeholder": "嵌入谷歌地图",
    "grantAccessActivityAction.accessGranted.title": "由{grantedBy}批准",
    "grantAccessActivityAction.alreadyHasAccess.label":
      "{requestingUser}已具有访问权限。",
    "grantAccessActivityAction.changePermissionButton.label": "更改",
    "grantAccessActivityAction.grantAccessButton.label": "授予访问权限",
    "grantAccessActivityAction.ignoreButton.label": "忽略",
    "guestPagesButton.label":
      "{numberOfAccessiblePages, plural, other {{numberOfAccessiblePages} 个页面}}",
    "guestPagesPopup.addAdminPermissionButton.label": "转为管理员",
    "guestPagesPopup.addAdminPermissionButton.tooltip":
      "这位访客将成为此工作区的管理员。",
    "guestPagesPopup.addMemberPermission.updatingMessage": "更新中…",
    "guestPagesPopup.addMemberPermissionButton.label": "转为成员",
    "guestPagesPopup.addMemberPermissionButton.tooltip":
      "这位访客将成为此工作区的成员。",
    "guestPagesPopup.guestAccessiblePagesCaption": "这位访客可以访问这些页面",
    "guestPagesPopup.permissionsForUserGuest.label": "访客",
    "guestPagesPopup.privatePagePlaceholder": "私人页面",
    "guestPagesPopup.removeGuest.updatingMessage": "更新中…",
    "guestPagesPopup.removeGuestButton.label": "移除",
    "guestPagesPopup.removeGuestButton.tooltip":
      "这位访客将从此工作区的所有页面中移除。",
    "guestPagesPopup.removeGuestModal.confirmationMessage":
      "确定要移除此人？他将无法访问所有已分享的页面。",
    "guestPagesPopup.removeGuestModal.removeButton.label": "移除",
    "header1Block.placeholder": "标题 1",
    "helpButton.contactSupport.menuItem": "联系客服",
    "helpButton.desktopHelpButton.tooltip": "帮助、反馈及快捷键",
    "helpButton.giveFeedback.menuItem": "提供反馈",
    "helpButton.helpSupportGuide.menuItem": "帮助和文档",
    "helpButton.joinUs.menuItem": "加入我们",
    "helpButton.keyboardShortcuts.menuItem": "键盘快捷键",
    "helpButton.mobile.rightActionButton.done": "完成",
    "helpButton.mobile.title": "帮助与反馈",
    "helpButton.mobileHelpFeedbackButton.label": "帮助与反馈",
    "helpButton.mobileTwitter.menuItem": "Twitter – @{notionHandle}",
    "helpButton.onboardingChecklist.menuItem": "Notion 基础知识",
    "helpButton.salesChat.menuItem": "联系销售人员",
    "helpButton.sendMessage.menuItem": "向支持人员发送消息",
    "helpButton.sendUsAMessage.tooltip":
      "我们使用 Intercom 发送消息。{br}请确保它未被你的浏览器阻止。",
    "helpButton.sendUsAMessage.tooltip.intercom.disabled":
      "要启用消息传递，请确保你已接受功能性 cookie。{br}你可以在 Notion 设置中更新你的 cookie。{br}你也可以发送电子邮件至 team@makenotion.com 与我们联系。",
    "helpButton.showTeamspacesEductation": "了解团队空间",
    "helpButton.survey.menuItem": "参与问卷调查",
    "helpButton.twitter.menuItem": "Twitter – @{notionHandle}",
    "helpButton.whatsNew.menuItem": "新消息",
    "hexBlock.embeds.button.label": "嵌入十六进制",
    "hexBlock.embeds.caption": "适用于具有公开访问权限的十六进制单元格链接。",
    "hexBlock.placeholder": "嵌入十六进制",
    "highlightSelectionButton.backgroundSection.label": "背景",
    "highlightSelectionButton.colorSection.label": "颜色",
    "highlightSelectionButton.defaultBackground.label": "默认背景",
    "highlightSelectionButton.lastUsedSection.label": "上次使用",
    "highlightSelectionButton.mobileColorIcon.label": "颜色",
    "highlightSelectionButton.mobileTextColor.label": "文本颜色",
    "highlightSelectionButton.textColor.tooltip": "文本颜色",
    "historyModal.confirmDialog.description": "确定恢复到此版本？",
    "historyModal.confirmDialog.restoreButton.label": "恢复",
    "historyModal.desktopModal.cancelButton.label": "取消",
    "historyModal.desktopModal.errorMessage": "出了些问题",
    "historyModal.desktopModal.learnMoreButton.label": "了解页面历史记录",
    "historyModal.desktopModal.restoreButton.label": "恢复版本",
    "historyModal.desktopModal.sidebar.upgradeMessage.tooltip":
      "升级以恢复快照。",
    "historyModal.errorMessage": "出了些问题",
    "historyModal.mobileHistoryMenu.title": "历史",
    "historyModal.mobileSnapshotMenu.restoreButton.label": "恢复",
    "historyModal.noSnapshotsYet.message":
      "此页面尚无任何快照。生成第一个快照最多需要 10 分钟。",
    "historyModal.snapshotsMenuList.upgrade.tooltip": "升级以查看此快照。",
    "historyModal.unavailableForFreeWorkspaces.messagePart1":
      "版本历史不适用于免费工作区。",
    "historyModal.unavailableForFreeWorkspaces.messagePart2":
      "请升级到我们的付费方案。",
    "historyModal.upgradeForHistoryButton.label": "升级",
    "historyModal.upgradeToEnterprise.message":
      "请升级到企业版以访问 30 天以上的版本历史。",
    "historyModalActions.restoringPreviousVersion.loadingMessage": "恢复中…",
    "hoverPreviewOverlay.action.turnPreviewIntoBlock": "转换成块",
    "hoverPreviewOverlay.action.turnPreviewIntoPreview": "转换为预览",
    "hoverPreviewOverlay.editButton.label": "编辑",
    "htmlHelpers.table.fileColumnName": "文件",
    "iFramePreview.imagelessAreaLabel": "点击以加载嵌入",
    "iFramePreview.pillLabel": "加载嵌入",
    "iconPicker.newBadge": "新功能",
    "iconPicker.section.icons": "图标",
    "iconPicker.section.recent": "最近的项目",
    "identityAndProvisioning.accountAuth.byline":
      "自定义用户访问启用了 SAML SSO 的工作区的方式。",
    "identityAndProvisioning.accountAuth.option.enforced": "仅限 SAML SSO",
    "identityAndProvisioning.accountAuth.option.notEnforced": "任何方式",
    "identityAndProvisioning.accountAuth.title": "登录方式",
    "identityAndProvisioning.claimWorkspaces.actionsMenu.terms": "条款和条件",
    "identityAndProvisioning.claimWorkspaces.button":
      "浏览 {numWorkspaces} 个工作区",
    "identityAndProvisioning.claimWorkspaces.buttonEmpty": "没有工作区",
    "identityAndProvisioning.claimWorkspaces.message":
      "声明使用经验证的域名创建的工作区或要求所有者使用外部域名",
    "identityAndProvisioning.claimWorkspaces.personalPlan": "个人版",
    "identityAndProvisioning.claimWorkspaces.proPlan": "个人专业版",
    "identityAndProvisioning.claimWorkspaces.summaryByline":
      "{subscriptionTier} · {memberCount, plural, one {{memberCount} 个成员} other {{memberCount} 个成员}}",
    "identityAndProvisioning.claimWorkspaces.table.admins": "工作区所有者",
    "identityAndProvisioning.claimWorkspaces.table.createdAt": "创建时间",
    "identityAndProvisioning.claimWorkspaces.table.createdBy": "创建者",
    "identityAndProvisioning.claimWorkspaces.table.empty":
      "没有可声明的工作区。",
    "identityAndProvisioning.claimWorkspaces.table.name": "工作区",
    "identityAndProvisioning.claimWorkspaces.table.pending": "待定",
    "identityAndProvisioning.claimWorkspaces.table.pendingExplaination":
      "等待 {name} 将工作区转移到外部帐户。",
    "identityAndProvisioning.claimWorkspaces.teamPlan": "团队",
    "identityAndProvisioning.claimWorkspaces.teamTrialPlan": "团队（试用版）",
    "identityAndProvisioning.claimWorkspaces.title": "声明工作区",
    "identityAndProvisioning.claimWorkspaces.tooltip":
      "没有可用的工作区可供声明",
    "identityAndProvisioning.claimWorkspaces.users.empty": "已删除用户",
    "identityAndProvisioning.claimWorkspaces.users.emptyTooltip":
      "从 {domain} 中删除的用户",
    "identityAndProvisioning.claimWorkspaces.users.name":
      "{remainingCount, plural, other {{firstUser} <gray>+{remainingCount}</gray>}}",
    "identityAndProvisioning.createAccount.byline":
      "为通过 SAML SSO 登录的新用户自动创建 Notion 帐户。",
    "identityAndProvisioning.createAccount.title": "自动创建帐户",
    "identityAndProvisioning.editSamlConfig.acsByline":
      "在您的 IDP 的 SAML 配置中输入此内容。",
    "identityAndProvisioning.editSamlConfig.acsTitle":
      "断言使用者服务 (ACS) URL",
    "identityAndProvisioning.editSamlConfig.byline":
      "使用您的身份提供商 (IDP) 为 Notion 工作区配置 SAML 单点登录。<guidelink>了解更多</guidelink>。",
    "identityAndProvisioning.editSamlConfig.cancel": "取消",
    "identityAndProvisioning.editSamlConfig.enableSaml": "启用 SAML",
    "identityAndProvisioning.editSamlConfig.feedback.empty":
      "你不能将此字段留空",
    "identityAndProvisioning.editSamlConfig.feedback.signed_request":
      "无法对请求进行签名",
    "identityAndProvisioning.editSamlConfig.idpTitle": "身份提供商详细信息",
    "identityAndProvisioning.editSamlConfig.idpUrl": "身份提供商 URL",
    "identityAndProvisioning.editSamlConfig.idpUrlByline":
      "输入你的 IDP 提供的值。",
    "identityAndProvisioning.editSamlConfig.idpXml": "身份提供商元数据 XML",
    "identityAndProvisioning.editSamlConfig.saveChanges": "保存更改",
    "identityAndProvisioning.editSamlConfig.title": "SAML 单点登录",
    "identityAndProvisioning.emailDomainsSection.byline":
      "使用具有已验证域名的邮箱地址的任何人都可以使用 SAML 单点登录。",
    "identityAndProvisioning.emailDomainsSection.title": "已验证的电子邮件域名",
    "identityAndProvisioning.samlToggle.byline":
      "使用已验证域的电子邮件地址的任何人都可以通过 SAML SSO 登录。",
    "identityAndProvisioning.samlToggle.configure": "编辑 SAML 单点登录配置",
    "identityAndProvisioning.samlToggle.learnMore": "了解 SAML 单点登录",
    "identityAndProvisioning.samlToggle.title": "启用 SAML 单点登录",
    "identityAndProvisioning.scim.byline": "生成令牌以配置 SCIM。",
    "identityAndProvisioning.scim.title": "SCIM 令牌",
    "identityAndProvisioning.secondaryWorkspaces.empty": "没有链接的工作区。",
    "identityAndProvisioning.secondaryWorkspaces.message":
      "此 SAML SSO 配置适用于以下其他工作区。 <contactlink>联系支持人员</contactlink>以添加或删除工作区。",
    "identityAndProvisioning.secondaryWorkspaces.table.memberCount": "成员",
    "identityAndProvisioning.secondaryWorkspaces.table.members":
      "{count} 个成员",
    "identityAndProvisioning.secondaryWorkspaces.table.name": "名称",
    "identityAndProvisioning.secondaryWorkspaces.table.plan": "创建时间",
    "identityAndProvisioning.secondaryWorkspaces.title": "链接的工作区",
    "identityProvisioningSettings.claimWorkspaces.actions.externalTransfer":
      "转移到外部帐户",
    "identityProvisioningSettings.claimWorkspaces.actions.externalTransferCaption":
      "用个人帐户替换当前工作区所有者。",
    "identityProvisioningSettings.claimWorkspaces.breadcrumb": "← 身份和配置",
    "identityProvisioningSettings.claimWorkspaces.byline":
      "向你的企业版声明验证域工作区或要求所有者使用外部域。",
    "identityProvisioningSettings.claimWorkspaces.personalSpaces":
      "个人版 {spacesCount}",
    "identityProvisioningSettings.claimWorkspaces.teamSpaces":
      "团队版 {spacesCount}",
    "identityProvisioningSettings.claimWorkspaces.title": "声明工作区",
    "identityProvisioningSettings.domain.title": "域名管理",
    "identityProvisioningSettings.offline.message":
      "请连接网络后管理身份和配置设置。",
    "identityProvisioningSettings.saml.title": "SAML 单点登录（SSO）",
    "identityProvisioningSettings.scim.title": "SCIM 配置",
    "identityProvisioningSettings.secondaryWorkspace.uneditableMessage":
      "已验证的域名和 SAML SSO 配置由工作区 <bold>{workspaceName}</bold> 管理。请导航到此处或联系该工作区的管理员，以编辑已验证的域名或 SSO 配置。",
    "identityProvisioningSettings.secondaryWorkspace.uneditableTitle":
      "主工作区是 <bold>{primaryWorkspaceName}</bold>。",
    "identityProvisioningSettings.setupInfo.title": "设置信息",
    "identityProvisioningSettings.title": "身份和配置",
    "imageBlock.embedImage.button.label": "嵌入图片",
    "imageBlock.linkInput.caption": "适用于网络上的任何图片。",
    "imageBlock.linkInput.placeholder": "粘贴图片链接…",
    "imageBlock.placeholder": "添加图片",
    "importActions.asanaImportFailedError.message": "Asana 导入失败。",
    "importActions.evernoteImportFailedError.message":
      "印象笔记国际版（Evernote）导入失败。",
    "importActions.fileImportFailedError.sizeTooLarge.message":
      "导入失败：文件超过 5MB。",
    "importActions.importFailedError.message": "导入失败。",
    "importActions.importTitle": "导入 {date}",
    "importActions.importingFromAsana.loadingMessage":
      "{importingCount, plural, other {正从 Asana 导入 {importingCount} 个项目中⋯}}",
    "importActions.importingFromEvernote.loadingMessage":
      "{importingCount, plural, other {正从 Evernote 导入 {importingCount} 个笔记本中⋯}}",
    "importActions.importingFromTrello.loadingMessage":
      "{importingCount, plural, other {正在导入 Trello 中的 {importingCount} 个看板中⋯}}",
    "importActions.importingMultipleFilesComplete.loadingMessage":
      "{totalNumberOfFiles} 个文件已导入，共 {totalNumberOfFiles} 个",
    "importActions.importingMultipleFilesInProgress.loadingMessage":
      "{numberOfUploadedFiles} 个文件已导入，共 {totalNumberOfFiles} 个",
    "importActions.importingMultipleFilesNotStarted.loadingMessage":
      "0 个文件已导入，共 {totalNumberOfFiles} 个",
    "importActions.importingOneFile.loadingMessage": "导入中…",
    "importActions.trelloImportFailedError.message": "Trello 导入失败。",
    "importActions.uploadingMultipleFilesComplete.loadingMessage":
      "{totalNumberOfFiles} 个文件已上传，共 {totalNumberOfFiles} 个",
    "importActions.uploadingMultipleFilesInProgress.loadingMessage":
      "{numberOfUploadedFiles} 个文件已上传，共 {totalNumberOfFiles} 个",
    "importActions.uploadingMultipleFilesNotStarted.loadingMessage":
      "0 个文件已上传，共 {totalNumberOfFiles} 个",
    "importActions.uploadingOneFile.loadingMessage":
      "上传中…（ {percentComplete}％）",
    "importAsana.databaseProperty.assignedPerson": "指派给",
    "importAsana.databaseProperty.attachedFiles": "附件",
    "importAsana.databaseProperty.completedCheckbox": "完成",
    "importAsana.databaseProperty.dueDate": "到期日",
    "importAsana.databaseProperty.name": "名称",
    "importAsana.databaseProperty.sectionMultiSelect": "分部",
    "importAsana.databaseProperty.tagsMultiSelect": "标签",
    "importErrors.enexFileNotSupported.message": "不支持 Evernote .enex 导入。",
    "importEvernote.databaseProperty.createdTime": "创建时间",
    "importEvernote.databaseProperty.name": "名称",
    "importEvernote.databaseProperty.reminder": "提醒",
    "importEvernote.databaseProperty.tags": "标签",
    "importEvernote.databaseProperty.updatedTime": "更新时间",
    "importEvernote.databaseProperty.url": "网址",
    "importEvernote.databaseViews.galleryView.title": "画廊视图",
    "importEvernote.databaseViews.listView.title": "列表视图",
    "importEvernote.importTooLarge.textProperty.message":
      "因为项目太大无法导入。所以我们将其内容转为文件上传了。",
    "importModal.helpButton.label": "了解导入",
    "importModal.importButton.label": "导入",
    "importOptions.helpButton.tooltip": "了解如何导入",
    "importOptions.offlineErrorMessage": "请连接网络后导入。",
    "importOptions.textMarkdown.title": "文本与 Markdown",
    "importPopup.deselectAll": "取消全选",
    "importPopup.selectAll": "全选",
    "importTrello.assignedPersonColumn.propertyName": "指派给",
    "importTrello.attachedFilesColumn.propertyName": "附件",
    "importTrello.database.defaultViewTitle": "默认视图",
    "importTrello.dueDateColumn.propertyName": "到期",
    "importTrello.labelColumn.propertyName": "标签",
    "importTrello.nameColumn.propertyName": "名称",
    "importTrello.statusColumn.propertyName": "状态",
    "importTrello.statusProperty.backlog": "待办需求",
    "importTrello.statusProperty.complete": "已完成",
    "importTrello.statusProperty.inProgress": "进行中",
    "inactiveSCIMTokenEmail.subjectLine.text":
      "你的 Notion 帐户：公共页面上审核过的内容",
    "inactiveScimTokenEmail.bodyLine1":
      "你的企业版工作区 <b> {spaceName}</b> 正在使用由不再是工作区管理员的用户生成的 SCIM API 令牌。",
    "inactiveScimTokenEmail.bodyLine2":
      "你可以通过进入<b>设置与成员 → 安全和身份 → SCIM 配置→ + 新令牌</b>来替换此令牌，然后在身份提供商中替换新令牌。",
    "inactiveScimTokenEmail.bodyLine3":
      "感谢你使用 Notion Enterprise 配置用户配置，以获得更安全的用户体验！",
    "inactiveScimTokenEmail.closingText": "──来自 Notion 团队",
    "inactiveScimTokenEmail.greetingWithName": "嗨，{customerName}！",
    "inactiveScimTokenEmail.greetingWithoutName": "嗨，你好！",
    "inactiveScimTokenEmail.helpCenterReference":
      "在<a>此处</a>可以找到完整的详细信息。",
    "inactiveScimTokenEmail.imageAltText":
      "显示 SCIM 令牌菜单并指示“+ 新建令牌”按钮位置的屏幕截图",
    "inactiveScimTokenEmail.subjectLine.text":
      "更换已撤销的 SCIM API 令牌的通知",
    "inlineCommentButton.commentLabel": "评论",
    "inlineCommentButton.tooltip": "对所选文本发表评论",
    "inlineEquationToken.invalidPlaceholder.label": "无效的公式",
    "inlineEquationToken.placeholder.label": "新公式",
    "inlineUnfurlingAuthenticationPopup.caption":
      "你和有权访问此 Notion 页面的任何其他人都将看到丰富的实时更新内容预览。",
    "inlineUnfurlingAuthenticationPopup.connectButton": "绑定",
    "inlineUnfurlingAuthenticationPopup.learnMore.text": "了解更多",
    "inlineUnfurlingAuthenticationPopup.title": "绑定 {integration}",
    "integrationErrors.domainAlreadyVerified.errorMessage":
      "集成已验证此域名。",
    "integrationImportPopup.importButton.label": "导入",
    "integrationInstallerFilter.userSearch.placeholder": "按用户筛选",
    "internalUnfurlingMenu.actions.pasteAsLink.title": "以链接形式粘贴",
    "internalUnfurlingMenu.actions.pasteAsMention.title": "以提及形式粘贴",
    "internalUnfurlingMenu.actions.pasteAsPreview.title": "以预览形式粘贴",
    "invalidNameErrors.errorMessage": "无效名称。",
    "invalidVATEmail.billingLink.text":
      "<b>请使用<billinglink>此链接</billinglink>更新你的税号。</b>",
    "invalidVATEmail.body.text":
      "我们联系你是因为你存档的增值税 (VAT) 编号或商品及服务税 (GST) 编号无效。根据当地法律，如果你没有有效的编号，我们需要向你征税。",
    "invalidVATEmail.closingText": "谢谢你。{br} ──来自 Notion 团队",
    "invalidVATEmail.greetingWithName": "嗨，{customerName}！",
    "invalidVATEmail.greetingWithoutName": "嗨，你好！",
    "invalidVATEmail.subjectLine.text": "请更新你的 Notion 帐户上的税号",
    "invisionBlock.embeds.button.label": "嵌入 Invision",
    "invisionBlock.embeds.caption": "适用于 Invision 项目",
    "invisionBlock.placeholder": "嵌入 Invision 项目",
    "inviteEmail.clickToViewPage.message": "点这里查看",
    "inviteEmail.clickToViewWorkspace.message": "点这里查看",
    "inviteEmail.pageInviteMessage": "{name}邀请你加入{pageName}。",
    "inviteEmail.pageTitle.untitledPage": "无标题",
    "inviteEmail.title": "邀请",
    "inviteEmail.workspaceInviteMessage":
      "{name}邀请你加入{workspaceName}工作区。",
    "inviteEmail.workspaceInviteMessageFromBot":
      "你已被邀请进入{workspaceName}工作区。",
    "inviteEmail.workspaceName.untitledName": "无标题",
    "inviteLinkErrors.inviteLinkDisabled.message":
      "邀请被禁用，请与此工作区的管理员联系。",
    "inviteLinkErrors.unableToJoinSpace.message":
      "请让管理员直接邀请你进入此空间。",
    "inviteUserButton.addGuestsAndGroupsAndIntegrationsLabel":
      "人员、邮箱地址、群组或集成",
    "inviteUserButton.addMemberLabel": "添加成员",
    "inviteUserButton.invitePersonLabel": "邀请",
    "inviteUserButton.modalTooltip.guestLimitLine1":
      "你的个人版最多可邀请 5 位不同的访客。",
    "inviteUserButton.modalTooltip.guestLimitLine2": "升级以无限使用",
    "inviteUserButton.tooltip.adminsOnlyMessage": "只有管理员可以添加成员。",
    "inviteUserButton.tooltip.fullAccessOnlyMessage":
      "只有拥有全部权限的人才能添加人员。",
    "inviteUserModal.addMemberMenu.title": "添加成员",
    "inviteUserModal.helpButton.caption": "了解如何邀请他人并设置权限",
    "inviteUserModal.inviteButton.label": "邀请",
    "inviteUserModal.inviteButton.upgradeLabel": "升级",
    "inviteUserModal.invitePersonMenu.title": "邀请人员",
    "inviteUserModal.mobile.inviteButton.label": "邀请",
    "inviteUserModal.permissionLevel.title": "权限级别",
    "inviteUserModal.searchDropdown.addPeople": "继续输入邀请电子邮件",
    "inviteUserModal.searchDropdown.selectGroupTitle": "选择一个群组",
    "inviteUserModal.searchDropdown.selectPersonTitle": "选择人员",
    "inviteUserModal.searchDropdown.selectTeamTitle": "选择团队空间",
    "inviteUserModal.searchInput.errorMessage": "出了些问题",
    "inviteUserModal.searchInput.placeholder": "搜索名称或邮箱地址",
    "inviteUserModal.searchPersonDropdown.noSearchResultsMessage":
      "在上面输入或粘贴邮箱地址，以逗号分隔。",
    "inviteUserModal.userAlreadyHasPermissionMessage": "{user}已拥有权限。",
    "inviteUserModal.userAlreadyInvitedMessage": "已邀请{user}。",
    "inviteUserModal.userRole.adminBadge.label": "管理员",
    "inviteUserModal.userRole.adminBadge.tooltip":
      "{ userNameAndEmail} 是此工作区的管理员",
    "inviteUserModal.userRole.guest.tooltip":
      "{ userNameAndEmail} 是此工作区的访客",
    "inviteUserModal.userRole.guestBadge.label": "访客",
    "inviteUserModal.userRole.invitedBadge.label": "已邀请",
    "inviteUserModal.userRole.invitedBadge.page.tooltip":
      "此人已受邀访问此页面",
    "inviteUserModal.userRole.invitedBadge.space.tooltip":
      "此人已受邀加入此工作区",
    "inviteUserModal.userRole.memberBadge.label": "成员",
    "inviteUserModal.userRole.memberBadge.tooltip":
      "{ userNameAndEmail} 是此工作区的成员",
    "inviteUserModal.userRole.membershipAdminBadge.label": "成员资格管理员",
    "inviteUserModal.userRole.membershipAdminBadge.tooltip":
      "此人是此工作区中的成员资格管理员",
    "inviteUserModal.userRole.newUserBadge.label": "新",
    "inviteUserModal.userRole.newUserBadge.tooltip": "此人当前无权访问此工作区",
    "inviteUserModal.userRole.workspaceOwnerBadge.label": "工作区所有者",
    "inviteUserModal.userRole.workspaceOwnerBadge.tooltip":
      "{ userNameAndEmail} 是此工作区中的工作区所有者",
    "invoice.chargeItem.changedNumberOfMembers.memberChange.new":
      "({oldTotalMembers} → {newTotalMembers})",
    "invoice.chargeItem.changedNumberOfMembers.membersAdded.new":
      "{numberOfMembersAdded, plural, other {在 {productName} 中添加了 {numberOfMembersAdded} 个成员}}",
    "invoice.chargeItem.changedNumberOfMembers.membersRemoved.new":
      "{numberOfMembersRemoved, plural, other {在 {productName} 中删除了 {numberOfMembersRemoved} 个成员}}",
    "invoice.chargeItem.discountApplied.label": "优惠券",
    "invoice.chargeItem.proratedCharge.switchedBillingInterval.fromMonthlyToYearly.new":
      "从月付方案更改为年付方案",
    "invoice.chargeItem.proratedCharge.switchedBillingInterval.fromYearlyToMonthly.new":
      "从年付方案更改为月付方案",
    "invoice.chargeItem.proratedCharge.switchedProducts.dateRange":
      "{startDate} - {endDate}",
    "invoice.chargeItem.proratedCharge.switchedProducts.new":
      "已从 {oldProductName} 更改为 {newProductName}",
    "invoice.chargeItem.taxCharge": "税",
    "invoice.chargeRecurringItem":
      "{numberOfMembers, plural, other {{planType} {intervalType} x {numberOfMembers} 个成员}}",
    "invoice.date.label": "发票日期",
    "invoice.details.amount": "金额",
    "invoice.details.date": "日期",
    "invoice.details.description": "描述",
    "invoice.details.helpButton.label": "了解有关按比例分配费用的更多信息",
    "invoice.details.label": "详细信息",
    "invoice.details.no.prorated.charges":
      "在此账单周期内没有按比例计算的费用。",
    "invoice.details.no.recurring.charges": "在此账单周期内没有任何定期费用。",
    "invoice.details.prorated.charges.explanation":
      "当你更改方案，或添加或移除工作区成员时，Notion 会将之前的成员数或方案记入你的账户，并就新成员数或方案的剩余时间向你收费。",
    "invoice.details.recurring.charges.explanation":
      "当你续订订阅时，Notion 会按账单周期向你收取费用。",
    "invoice.details.subtotal": "小计",
    "invoice.details.taxLanguage.explanation":
      "税费将根据你所在的司法管辖区而有所不同。如果贵公司位于美国，则税费涉及州和地方销售税。如果贵公司位于加拿大，则税费以魁北克销售税 (QST) 表示。如果贵公司位于欧盟、英国或俄罗斯，则税费以增值税 (VAT) 表示。如果你位于欧盟或英国且不需要支付增值税，则在收到此发票时，其相关服务视为已提供，并且根据第 196 条理事会指令 2006/112/EC，客户必须在各自管辖范围内以反向收费的方式自行核算增值税。",
    "invoice.details.taxLanguage.explanation.ca": "CA QST: NR00012289",
    "invoice.details.taxLanguage.explanation.ru.inn": "RU INN: 9909540024",
    "invoice.details.taxLanguage.explanation.ru.kpp": "RU KPP: 997789001",
    "invoice.details.taxLanguage.explanation.vat": "EU VAT: EU528003828",
    "invoice.intervalType.monthly": "月付",
    "invoice.intervalType.yearly": "年付",
    "invoice.memberCount":
      "{numberOfMembers, plural, other {{numberOfMembers} 位成员}}",
    "invoice.number.label": "账单编号",
    "invoice.payment.info.stripeLink.downloadReceipt": "点击以下载收据",
    "invoice.payment.info.stripeLink.pay": "点击以支付账单",
    "invoice.payment.status.label": "状态",
    "invoice.paymentInfo.label": "付款",
    "invoice.pdf.title": "Notion 发票 {date}",
    "invoice.planType.business": "商业版",
    "invoice.planType.enterprise": "企业版",
    "invoice.planType.legacy": "旧版",
    "invoice.planType.personal": "个人版",
    "invoice.planType.personalEducation": "个人教育版",
    "invoice.planType.team": "团队版",
    "invoice.printOrExportButton.label": "打印或导出为 PDF",
    "invoice.productName.business":
      "{billingInterval, select, month {Notion 商业版月付方案} year {Notion 商业版年付方案} other {Notion 商业版}}",
    "invoice.productName.enterprise":
      "{billingInterval, select, month {Notion 企业版月付方案} year {Notion 企业版年付方案} other {Notion 企业版}}",
    "invoice.productName.legacy":
      "{billingInterval, select, month {Notion 旧月付方案} year {Notion 旧年付方案} other {Notion 旧方案}}",
    "invoice.productName.personal":
      "{billingInterval, select, month {Notion 个人版月付方案} year {Notion 个人版年付方案} other {Notion 个人版}}",
    "invoice.productName.personalEducation":
      "{billingInterval, select, month {Notion 个人专业版（教育）月付方案} year {Notion 个人专业版（教育）年付方案} other {Notion 个人专业版（教育）}}",
    "invoice.productName.team":
      "{billingInterval, select, month {Notion 团队版月付方案} year {Notion 团队版年付方案} other {Notion 团队版}}",
    "invoice.recipient.billing.label": "记账对象",
    "invoice.recurringDate": "{startDate} - {endDate}",
    "invoice.status.not_paid": "未支付",
    "invoice.status.paid": "已付费",
    "invoice.status.upcoming": "下一个账单・尚未到期",
    "invoice.summary.amountDue.label": "截止时间",
    "invoice.summary.credits": "积分",
    "invoice.summary.prorated.charges": "按比例分配的费用",
    "invoice.summary.prorated.charges.credits": "按比例分配的费用和积分",
    "invoice.summary.prorated.charges.explanation":
      "账单周期内成员和方案变更的部分费用。",
    "invoice.summary.recurring.charges": "周期性方案费用",
    "invoice.summary.recurring.charges.explanation":
      "在此账单周期内 Notion 方案的续费费用。",
    "invoice.summary.tax": "税",
    "invoice.title": "Notion",
    "invoice.title.label": "发票",
    "invoice.total.label": "应付总额",
    "invoice.upcomingInvoicePlaceholder": "下一个账单",
    "invoice.workspace.label": "工作区",
    "invoiceErrors.invoiceNotFound.message":
      "你可能需要<loginlink>登录</loginlink>才能查看。",
    "invoiceErrors.invoiceNotFound.title": "找不到账单",
    "languagePicker.betaBadge": "试用版",
    "languagePicker.captions.chineseS": "简体中文",
    "languagePicker.captions.chineseT": "繁体中文",
    "languagePicker.captions.englishUS": "英文（美国）",
    "languagePicker.captions.frenchFr": "法文",
    "languagePicker.captions.germanDE": "德语",
    "languagePicker.captions.japaneseJa": "日文",
    "languagePicker.captions.koreanKo": "韩文",
    "languagePicker.captions.portugueseBr": "葡萄牙文（巴西）",
    "languagePicker.captions.spanishEs": "西班牙文（西班牙）",
    "languagePicker.captions.spanishLatam": "西班牙文（拉丁美洲）",
    "languagePicker.changeLanguage.confirmationMessage":
      "确定要将语言更新为{language}吗？",
    "languagePicker.changeLanguage.updateButton.label": "更新",
    "languageRegionSettings.language.label": "语言",
    "languageSettings.formatsSection.title": "格式",
    "languageSettings.languageSection.title": "语言与地区",
    "languageSettings.languageSwitcher.subtitle": "更改用户界面的语言。",
    "languageSettings.offline.message": "请连接网络以设置语言和地区。",
    "leaveTeam.cannotLeaveTeamDialog.partOfGroup.label":
      "你无法离开 {teamName}，因为你是通过工作区管理员管理的群组添加到此团队的。",
    "leaveTeam.confirmDialog.cancelButton.label": "取消",
    "leaveTeam.confirmDialog.confirmButton.label": "退出团队",
    "leaveTeam.confirmDialog.description.label":
      "是否确定要退出 {team}？此团队不再显示在侧边栏中，你可能会失去权限。",
    "leaveTeam.onlyTeamMeberLeft.label":
      "你不能退出此团队，因为你是唯一的团队所有者。邀请其他团队所有者，你才能退出。",
    "linkMention.reload": "重新加载提及",
    "linkPreview.reload": "重新加载预览",
    "linkToCollectionBlock.input.placeholder": "搜索数据库…",
    "linkToCollectionBlock.menuItem.noResults.label": "无结果",
    "linkToCollectionBlock.menuItem.noResults.title": "选择数据库",
    "linkToCollectionBlock.menuItem.showResults.title": "选择数据库",
    "linkToPageBlock.noSearchResults": "无结果",
    "linkToPageBlock.searchPlaceholder": "搜索页面…",
    "linkToPageBlock.selectPrompt": "选择页面",
    "linkToPageBlock.selectPrompt.withContents": "选择页面",
    "loadingSpinner.label": "载入中…",
    "localDatabase.erroMessages.noDiskSpaceRemaining":
      "磁盘空间不足。如果不能解决问题，请联系客服。",
    "localDatabase.erroMessages.noDiskSpaceRemainingBrowserLimit":
      "磁盘空间不足。你的浏览器设置可能限制了 Notion 可以使用的存储空间。如果不能解决问题，请联系客服。",
    "localDatabase.errorFixes.chromeSettingsDamaged":
      "你的 Chrome 个人资料可能已损坏。如果你更改了 chrome://flags，请重设它们，然后重新启动浏览器。如果问题仍然存在，请尝试创建新的 Chrome 用户。如果不能解决问题，请联系客服。",
    "localDatabase.errorFixes.chromeUpgradeCorruptedSettings":
      "你的 Chrome 个人资料可能已损坏。要获得更一致的体验，请下载 Notion 桌面应用：https://notion.so/desktop",
    "localDatabase.errorFixes.firefoxSettingsDamaged":
      "你的 Firefox 个人资料可能已损坏。访问 https://firefox-storage-test.glitch.me/ 进行诊断。如果不能解决问题，请联系客服。",
    "localDatabase.errorFixes.helpAndSupportPrompt":
      "Notion 的本地存储可能损坏了。请参阅 (?) > 帮助和支持 > 重置 Notion。如果不能解决问题，请联系客服。",
    "localDatabase.errorFixes.reloadAllTabs":
      "尝试关闭并重新打开所有 Notion 的选项卡或窗口。如果不能解决问题，请联系客服。",
    "localDatabase.errorFixes.reloadThisTab":
      "尝试重新加载 Notion。如果不能解决问题，请联系客服。",
    "loginActions.dialogError.logoutUnsavedChanges.confirmButton.label":
      "放弃编辑并登出",
    "loginActions.dialogError.logoutUnsavedChanges.message":
      "你尚未保存更改。如果你现在退出，可能会丢失这些更改。",
    "loginActions.googleLoginPopupModal.title": "谷歌登录",
    "loginActions.loggingInWithApple.errorMessage":
      "尝试使用 Apple 登录时出了点问题。",
    "loginActions.loggingInWithApple.loadingMessage": "使用 Apple 登录中…",
    "loginActions.loggingInWithGoogle.errorMessage":
      "尝试使用 Google 登录时出现问题。",
    "loginActions.loggingInWithGoogle.loadingMessage": "使用谷歌登录中…",
    "loginActions.login.pending.message": "正在登录 Notion…",
    "loginActions.signup.pending.message": "正在创建 Notion 帐户…",
    "loginErrors.adminModeUnsupported.message": "不适用于管理员模式",
    "loginErrors.bannedNetwork.message":
      "你与 Notion 的网络连接出现问题。请在应用内联系客服或发送电子邮件至 team@makenotion.com。",
    "loginErrors.bannedUser.message": "你的帐户有问题。请联系客服。",
    "loginErrors.csrf.message":
      "如果您通过链接登录，请在您请求链接的浏览器中打开该链接。",
    "loginErrors.generic.message": "登录时出现问题。",
    "loginErrors.invalidEmail.message": "无效的邮箱地址。",
    "loginErrors.invalidPassword.message": "无效的密码",
    "loginErrors.restrictedRegion.message":
      "你正试图从受限制的司法管辖区访问我们的服务。",
    "loginErrors.tryAgain.message": "请重新登录。",
    "loginForm.continueWithEmailButton.label": "用邮箱地址登录",
    "loginForm.continueWithLoginCodeButton.label": "用临时登录码登录",
    "loginForm.continueWithPasswordButton.label": "用密码登录",
    "loginForm.continueWithReverifyButton.label": "验证邮箱地址",
    "loginForm.continueWithSAMLButton.label": "用 SAML 登录",
    "loginForm.createNewAccountButton.label": "创建新帐户",
    "loginForm.disclaimer":
      "点击上方的“用谷歌帐户 / 邮箱地址 / SAML 登录”，即表示你已经阅读和理解，并同意 Notion 的<termsandconditionslink>条款和条件</termsandconditionslink>和<privacypolicylink>隐私政策</privacypolicylink>。",
    "loginForm.emailInput.label": "邮箱地址",
    "loginForm.emailInput.placeholder": "输入你的邮箱地址…",
    "loginForm.forgotPasswordLink": "忘记密码？",
    "loginForm.loginCodeInput.label": "登录码",
    "loginForm.loginWithAppleButton.label": "Apple 登录",
    "loginForm.loginWithGoogleButton.label": "用谷歌帐户登录",
    "loginForm.otherLoginOptions.continueWithEmail":
      "你也可以<emailloginlink>使用邮箱地址</emailloginlink>以继续",
    "loginForm.otherLoginOptions.continueWithEmailOrSAML":
      "你也可以<emailloginlink>使用邮箱地址</emailloginlink>或<samlloginlink>使用 SAML SSO</samlloginlink> 以继续",
    "loginForm.otherLoginOptions.continueWithSAML":
      "你也可以<samlloginlink>使用 SAML SSO</samlloginlink> 以继续",
    "loginForm.passcodeInput.enterCodePlaceholder": "输入登录码",
    "loginForm.passcodeInput.enterPasswordPlaceholder": "输入密码…",
    "loginForm.passcodeInput.enterSignupCodePlaceholder": "输入注册码",
    "loginForm.passcodeInput.pasteCodePlaceholder": "粘贴登录码",
    "loginForm.passcodeInput.pasteSignupCodePlaceholder": "粘贴注册码",
    "loginForm.passcodeInput.reverifyPlaceholder": "粘贴验证码",
    "loginForm.passwordInput.label": "密码",
    "loginForm.passwordResetSentMessage": "检查收件箱中的链接以重置密码。",
    "loginForm.reverifyPasswordLabel":
      "<emailverifiedtext>邮箱地址已验证</emailverifiedtext>。你可以继续使用密码登录。",
    "loginForm.reverifySentMessage":
      "此帐户需要邮箱地址验证。请检查你的收件箱并粘贴验证码。",
    "loginForm.sendResetLink": "发送重置链接",
    "loginForm.signUpCodeInput.label": "注册码",
    "loginForm.temporaryPasscodeSentMessage":
      "我们刚刚向你发送了一个临时登录码。{br}请检查你的收件箱。",
    "loginForm.temporaryPasscodeSentMessageNoAccount":
      "我们刚刚向你发送了一个临时注册码。请检查你的收件箱并把注册码粘贴在下面。",
    "loginForm.verificationCodeInput.label": "验证码",
    "loginForm.workEmailInput.label": "工作用邮箱地址",
    "loginMobileNative.descriptionOfNotion.message":
      "Notion 是个可以用于<mediumfont>笔记</mediumfont>、 <mediumfont>任务管理</mediumfont>和<mediumfont>知识库</mediumfont>的协作工具",
    "loginMobileNative.footer.helpButton.label": "需要帮助？",
    "loginMobileNative.footer.privacyAndTermsButton.label": "隐私与条款",
    "loginMobileNative.goBackButton.label": "后退",
    "loginMobileNative.welcomeMessage": "欢迎来到 Notion！👋",
    "loginPage.pageTitle": "登录",
    "loginPage.title": "登录",
    "loginPermissions.googleContactPermissions.checkboxUnchecked.message":
      "我不想分享谷歌联系人",
    "loginPermissions.googleContactPermissions.message":
      "我们请求读取你的 Google 通讯录，以便通过 Notion 邀请或提及人员时为你提供更好的体验。",
    "loomBlock.embed.caption": "适用于启用了公共访问的 Loom 链接",
    "loomBlock.placeholder": "嵌入 Loom",
    "manageActiveSessions.confirmationModal.close": "关闭",
    "manageActiveSessions.confirmationModal.withEmail":
      "你已从 {email} 的其他活动会话中注销。",
    "manageActiveSessions.confirmationModal.withoutEmail":
      "你已经从其他活动会话中注销了。",
    "manageActiveSessions.logOutActiveSessions.button": "登出",
    "manageActiveSessions.logOutActiveSessions.label":
      "你将退出当前会话之外的所有其他活动会话，并且必须重新登录。",
    "manageActiveSessions.title": "从所有设备登出",
    "manageSCIMTokenTable.ConfirmDeletingTokenModal.acceptButton.label":
      "撤销令牌",
    "manageSCIMTokenTable.ConfirmDeletingTokenModal.cancelButton.label": "取消",
    "manageSCIMTokenTable.ConfirmDeletingTokenModal.description":
      "一旦令牌被撤销，使用该令牌的现有 SCIM 配置将不再工作，你必须为它们提供一个新令牌。",
    "manageSCIMTokenTable.ConfirmDeletingTokenModal.message":
      "你确定要撤销此令牌吗？",
    "manageSCIMTokenTable.colums.addedBy.selfIndicator": "（你）",
    "manageSCIMTokenTable.noTokensFound.message": "没有活动状态的 SCIM 令牌。",
    "manageScimTokenTable.OutdatedWarningIcon.tooltip":
      "过期令牌。撤销此令牌并生成一个新令牌以查看其内容。",
    "manageScimTokenTable.columnTitle.addedBy": "添加者",
    "manageScimTokenTable.columnTitle.created": "创建时间",
    "manageScimTokenTable.columnTitle.token": "令牌",
    "manageScimTokenTable.renderTokenThatCannotBeViewed.tooltip":
      "此令牌只能由其创建者查看。",
    "manageTeamAccessCell.selectLabel.closedTeam": "封闭式",
    "manageTeamAccessCell.selectLabel.openTeam": "开放式",
    "manageTeamAccessCell.selectLabel.privateTeam": "私人",
    "manageTeamAccessCell.selectLabel.privateUnderTeamPlanUpgradeBusinessTooltip":
      "在商业版功能下，团队访问权限只能设置为私人。{br}如果您将团队访问权限更改为“开放式”或“封闭式”，则需要进行升级才能恢复为“私人”。",
    "manageTeamAccessCell.selectLabel.privateUnderTeamPlanUpgradeEnterpriseTooltip":
      "在企业版功能下，团队访问权限只能设置为私人。{br}如果您将团队访问权限更改为“开放式”或“封闭式”，则需要进行升级才能恢复为“私人”。",
    "manageTeamAccessCell.selectLabel.privateUpgradeToBusinessTooltip":
      "升级到商业版以设置为私人",
    "manageTeamAccessCell.selectLabel.privateUpgradeToEnterpriseTooltip":
      "升级到企业版以设置为私人",
    "manageTeamAccessCell.selectLabel.upgradeBadge": "{tier}",
    "manageTeamsAccessFilter.accessFilter.filterAllTeams": "任何",
    "manageTeamsAccessFilter.accessFilter.filterClosedTeams": "封闭式",
    "manageTeamsAccessFilter.accessFilter.filterOpenTeams": "开放式",
    "manageTeamsAccessFilter.accessFilter.filterPrivateTeams": "私人",
    "manageTeamsAccessFilter.accessSelectPlaceolder": "访问权限",
    "manageTeamsArchivedFilter.archivedFilter.hideArchivedTeams": "隐藏已归档",
    "manageTeamsArchivedFilter.archivedFilter.showArchivedTeams": "显示已归档",
    "manageTeamsArchivedFilter.archivedSelectPlaceolder": "已归档",
    "manageTeamsBrowser.newTeamButton.text": "新建团队",
    "manageTeamsBrowser.subtitle": "在这里管理您有权访问的所有团队空间。",
    "manageTeamsBrowser.title": "管理团队空间",
    "manageTeamsFilterRow.searchFilter.placeholder": "搜索",
    "manageTeamsHelpers.confirmChangeSecuritySetting.allowTeamCreation":
      "确定要允许此工作区的所有成员创建团队？",
    "manageTeamsHelpers.confirmChangeSecuritySetting.confirm": "确认",
    "manageTeamsHelpers.confirmChangeSecuritySetting.disableTeamCreation":
      "确定要仅限管理员创建团队？",
    "manageTeamsHelpers.confirmChangeSecuritySetting.workspaceOwners.disableTeamCreation":
      "是否确实要仅限工作区所有者才能创建团队空间？",
    "manageTeamsOwnerFilter.filterTitle.onlyOrphanedTeams": "所有者：无",
    "manageTeamsOwnerFilter.filterTitle.unset": "所有者",
    "manageTeamsOwnerFilter.filterTitle.withSpecifiedOwner":
      "所有者：{teamOwnerName}",
    "manageTeamsOwnerFilter.noOwnersFilterOption": "没有所有者的团队空间",
    "manageTeamsOwnerFilter.searchOwner.placeholder": "搜索团队空间所有者...",
    "manageTeamsOwnerFilter.searchOwner.resultsTitle": "选择用户",
    "manageTeamsOwnersCell.nMoreOwnersLabel": "+{numAdditionalOwners}",
    "manageTeamsOwnersCell.noOwners": "没有所有者",
    "manageTeamsTable.access.openTeamLabel": "开放式",
    "manageTeamsTable.access.privateTeamLabel": "私人",
    "manageTeamsTable.archivedTag": "已归档",
    "manageTeamsTable.columnTitle.access": "访问权限",
    "manageTeamsTable.columnTitle.members": "成员",
    "manageTeamsTable.columnTitle.owners": "所有者",
    "manageTeamsTable.columnTitle.team": "团队",
    "manageTeamsTable.columnTitle.updated": "更新时间",
    "manageTeamsTable.emptyManageTeamTableDisclaimer.noTeamsExist":
      "找不到任何团队空间。",
    "manageTeamsTable.emptyManageTeamTableDisclaimer.teamsFilteredOut":
      "找不到任何团队空间。<linkbutton>请重置筛选器</linkbutton>",
    "manageTeamsTable.numMembersCell":
      "{numTeamMembers, plural, other {个成员}}",
    "manageTeamspacesTable.columnTitle.teamspace": "团队空间",
    "marginComments.collapsed.expand.label": "展开",
    "marginComments.collapsed.numComments.count":
      "{numComments, plural, other {{numComments} 条评论}}",
    "mathParseHelpers.errorPosition.message": "字符 {position}",
    "mathParseHelpers.fullError.message": "{errorBody} ({postfix})",
    "mathParseHelpers.syntax.error": "部分 {token} 中的语法错误",
    "mathParseHelpers.tokenExpected.error": "预期的 {token}",
    "mathParseHelpers.unexpected.error": "意外的 {token}",
    "mediaPicker.chooseFile.button.label": "选择文件",
    "mediaPicker.chooseImage.buttonText": "上传文件",
    "mediaPicker.chooseVideo.buttonText": "选择视频",
    "mediaPicker.embedPlaceholder.text": "以 https://… 格式粘贴",
    "mediaPicker.embedTab.embedLinkButtonText": "链接",
    "mediaPicker.emojiFilter.text": "筛选…",
    "mediaPicker.emojiTab.random": "随机",
    "mediaPicker.errorMessage": "糟糕，出了些问题。",
    "mediaPicker.invalidImageDrop.wrongTypeErrorMessage":
      "抱歉，不支持该文件类型。",
    "mediaPicker.invalidLinkError.text": "请输入有效的链接。",
    "mediaPicker.maximumFileSize.notice": "每个文件的大小不超过 {filesize}MB。",
    "mediaPicker.menuItem.choosePagesFromAccount.label": "从{accountName}选择",
    "mediaPicker.menuItem.connectFirstGoogleAccount.caption":
      "查找并嵌入谷歌云端硬盘中的文件",
    "mediaPicker.menuItem.connectFirstGoogleAccount.label": "绑定谷歌帐户",
    "mediaPicker.menuItem.connectMoreGoogleAccounts.label": "绑定另一个帐户",
    "mediaPicker.mobileCloseButton.label": "关闭",
    "mediaPicker.mobileRemoveButton.label": "移除",
    "mediaPicker.tabs.browse": "浏览",
    "mediaPicker.tabs.custom": "自定义",
    "mediaPicker.tabs.embedLink": "嵌入链接",
    "mediaPicker.tabs.emoji": "表情符号",
    "mediaPicker.tabs.gallery": "画廊",
    "mediaPicker.tabs.icon": "图标",
    "mediaPicker.tabs.remove": "移除",
    "mediaPicker.tabs.upload": "上传",
    "mediaPicker.unsplash.byAuthor":
      "作者 <inlinetextlink>{authorName}</inlinetextlink>",
    "mediaPicker.unsplash.noResultsText": "未找到结果。",
    "mediaPicker.unsplash.searchText": "搜索以查找更多结果。",
    "mediaPicker.unsplashPlaceholder.text": "搜索图片…",
    "memberSettingsButton.goOnline.prompt": "请连接网络后管理成员。",
    "memberSettingsButton.mobileMemberSettings.title": "成员",
    "memberSettingsButton.mobileSidebar.label": "成员",
    "memberSettingsButton.rightActionButton.done": "完成",
    "mentionMenu.addPage.prompt2": "输入以添加或链接页面…",
    "mentionMenu.createPageSection.title": "新页面",
    "mentionMenu.date.autocomplete.nextTuesday": "下周二下午 3 点",
    "mentionMenu.date.autocomplete.reminder": "提醒明天上午9点",
    "mentionMenu.date.autocomplete.today": "今天",
    "mentionMenu.date.prompt2": "提及日期…",
    "mentionMenu.date.remindAtDateTime": "提醒{dateTime}",
    "mentionMenu.dateSection.title": "日期",
    "mentionMenu.noSearchResults.title": "无结果",
    "mentionMenu.offlineMessage": "连接网络后便可提及人员或页面。",
    "mentionMenu.page.prompt2": "输入以链接或添加页面…",
    "mentionMenu.pageDate.prompt2": "提及页面或日期…",
    "mentionMenu.pagesSection.title2": "链接到页面",
    "mentionMenu.peopleSection.title": "人员",
    "mentionMenu.person.prompt2": "提及人员…",
    "mentionMenu.personDate.prompt2": "提及人员或日期…",
    "mentionMenu.personPage.prompt2": "提及人员或页面…",
    "mentionMenu.personPageDate.prompt2": "提及人员、页面或日期…",
    "mentionMenu.showMoreResultsButton.title": "其余 {numberMore} 个结果",
    "mentionMenu.templateVariables.description.me": "复制的用户",
    "mentionMenu.templateVariables.description.now": "复制时间",
    "mentionMenu.templateVariables.description.today": "复制日期",
    "mentionMenu.templateVariables.keywords.me": "我",
    "mentionMenu.templateVariables.keywords.now": "现在",
    "mentionMenu.templateVariables.keywords.today": "今天",
    "mentionMenu.templateVariables.text.me": "我",
    "mentionMenu.templateVariables.text.now": "现在",
    "mentionMenu.templateVariables.text.tday": "今天",
    "menuList.menuListSection.noResult": "无结果",
    "mermaidRenderer.error.seeMermaidExamples": "查看 Mermaid 示例",
    "mermaidRenderer.error.unknownError": "未知错误： {error}",
    "miroBlock.embeds.button.label": "嵌入 Miro",
    "miroBlock.embeds.caption": "适用于启用了公共访问的 Miro 链接",
    "miroBlock.placeholder": "嵌入 Miro",
    "mobile.dismissKeyboardBar.button.label": "完成",
    "mobile.modal.backButton": "返回",
    "mobile.modal.cancelButton": "取消",
    "mobile.modal.doneButton": "完成",
    "mobileActionBar.accessibility.blockColor": "更改块颜色",
    "mobileActionBar.accessibility.bold": "加粗",
    "mobileActionBar.accessibility.close": "关闭文本格式菜单",
    "mobileActionBar.accessibility.closeMenu": "关闭菜单",
    "mobileActionBar.accessibility.code": "代码",
    "mobileActionBar.accessibility.comment": "添加评论",
    "mobileActionBar.accessibility.endEditing": "结束编辑",
    "mobileActionBar.accessibility.equation": "添加公式",
    "mobileActionBar.accessibility.filePicker": "添加图片",
    "mobileActionBar.accessibility.indent": "缩进块",
    "mobileActionBar.accessibility.insertBlock": "添加块",
    "mobileActionBar.accessibility.italics": "斜体",
    "mobileActionBar.accessibility.link": "添加链接",
    "mobileActionBar.accessibility.mention": "添加提及",
    "mobileActionBar.accessibility.more": "更多块操作",
    "mobileActionBar.accessibility.moveDown": "向下移动块",
    "mobileActionBar.accessibility.moveUp": "向上移动块",
    "mobileActionBar.accessibility.redo": "重做编辑",
    "mobileActionBar.accessibility.strikethrough": "删除线",
    "mobileActionBar.accessibility.textColor": "文本颜色",
    "mobileActionBar.accessibility.textFormatting": "打开文本格式菜单",
    "mobileActionBar.accessibility.trash": "删除块",
    "mobileActionBar.accessibility.turnInto": "转换成块",
    "mobileActionBar.accessibility.udno": "撤消编辑",
    "mobileActionBar.accessibility.underline": "下划线",
    "mobileActionBar.accessibility.unindent": "取消缩进块",
    "mobileActionBar.actionMenuTitle.blockColor": "颜色",
    "mobileActionBar.actionMenuTitle.insertBlock": "插入块",
    "mobileActionBar.actionMenuTitle.turnInto": "转换成",
    "mobileActionBar.blockColor.modalTitle": "块颜色",
    "mobileActionBar.bold.symbol": "B",
    "mobileActionBar.code.symbol": "代码",
    "mobileActionBar.color.buttonTitle": "颜色",
    "mobileActionBar.databaseSection.title": "数据库",
    "mobileActionBar.insertBlock.modalTitle": "插入块",
    "mobileActionBar.italic.symbol": "i",
    "mobileActionBar.link.symbol": "链接",
    "mobileActionBar.more.buttonTitle": "更多",
    "mobileActionBar.nativeMenu.textColor.title": "颜色",
    "mobileActionBar.strikeThrough.symbol": "S",
    "mobileActionBar.templateButtonTitle": "选择模板...",
    "mobileActionBar.templates.buttonTitle": "选择模板…",
    "mobileActionBar.templates.modalTitle": "模板",
    "mobileActionBar.turnInto.buttonTitle": "转换成",
    "mobileActionBar.turnInto.modalTitle": "转换成",
    "mobileActionBar.underline.symbol": "U",
    "mobileAppDownloadStep.button": "下载Notion",
    "mobileAppDownloadStep.subTitle":
      "在移动浏览器中完成Notion设置或下载用于{os}的Notion。",
    "mobileAppDownloadStep.title": "<boldtext>应用程序下载</boldtext>",
    "mobileCalendarDayMenu.newItemButton.label": "新项目",
    "mobileCalendarDayMenu.noResults.message": "无项目",
    "moveBlockMenu.addFromTemplate.title": "从模板添加",
    "moveBlockMenu.addToPrivatePages":
      "移动到<mediumtext>私人页面</mediumtext>",
    "moveBlockMenu.addToSpace.title": "添加到工作区",
    "moveBlockMenu.currentPage.pluralAddTitle": "新的子页面",
    "moveBlockMenu.currentPage.singleAddTitle": "新的子页面",
    "moveBlockMenu.errorOnMove.label": "出了些问题。",
    "moveBlockMenu.learnMoreButton.title": "了解更多",
    "moveBlockMenu.learnMoreButton.tooltip": "选择要移动到的目的地",
    "moveBlockMenu.mobileAddTo.label": "添加到另一页面…",
    "moveBlockMenu.mobileMoveTo.label": "移动到",
    "moveBlockMenu.mobileNewPageInj.label": "添加到另一页面",
    "moveBlockMenu.moveToSpace.title": "移动到工作区",
    "moveBlockMenu.moveToTemplate.title": "移动到模板",
    "moveBlockMenu.noResults.label": "无结果",
    "moveBlockMenu.pagesSection.title": "页面",
    "moveBlockMenu.rightDoneButton.label": "完成",
    "moveBlockMenu.spaceSwitcher.menuTitle": "工作区",
    "moveBlockMenu.suggestedSection.title": "建议",
    "moveBlockMenu.teamsSection.title": "团队空间",
    "moveToHelpers.afterBulkMoveCompleteToastMessage":
      "移动了 {pageDescriptor}",
    "moveToHelpers.afterBulkMoveCompleteToastMessageWithDestination":
      "将 {pageDescriptor} 移动到了 {destinationName}",
    "moveToHelpers.afterMoveToast.viewButton": "访问",
    "moveToHelpers.bulkMoveConfirmationButtonLabel":
      "{moveToHelpers.bulkMoveConfirmationButtonLabel, plural, other {移动 {numPagesMoved, plural, one {# 页} other {# 页}}}}",
    "moveToHelpers.bulkMoveConfirmationTitle":
      "{moveToHelpers.bulkMoveConfirmationTitle, plural, other {是否确定要将 {pageDescriptor} 移动到 {destinationName}？权限可能会发生改变。}}",
    "moveToHelpers.bulkMoveConfirmationTitleWithoutDestination":
      "{moveToHelpers.bulkMoveConfirmationTitleWithoutDestination, plural, other {是否确定要移动 {pageDescriptor}？权限可能会发生改变。}}",
    "moveToHelpers.bulkMoveConfirmationToPrivateTitle":
      "{moveToHelpers.bulkMoveConfirmationToPrivateTitle, plural, other {是否确定要将 {pageDescriptor} 移动到 {destinationName}？团队中的所有人都将失去访问权限。}}",
    "moveToHelpers.bulkMoveConfirmationWithoutDestinationToPrivateTitle":
      "{moveToHelpers.bulkMoveConfirmationWithoutDestinationToPrivateTitle, plural, other {是否确定要移动 {pageDescriptor}？团队中的所有人都将失去访问权限。}}",
    "moveToHelpers.destinationName.favorites": "收藏夹",
    "moveToHelpers.destinationName.private": "私人",
    "moveToHelpers.moveBlocksDescriptorString":
      "{numBlocksMoved, plural, other {# 个块}}",
    "moveToHelpers.movePageDescriptorString":
      "{numPagesMoved, plural, other { 页}}",
    "moveToMenuActions.movingContent.loadingMessage": "正在移动内容…",
    "moveToMenuRenderer.addNewPageIn.label": "搜索要添加到的页面…",
    "moveToMenuRenderer.addTo.label": "搜索要添加到的页面…",
    "moveToMenuRenderer.moveTo.teamLabel": "将页面移至…",
    "moveToModal.relevantSection.title": "相关",
    "moveToModal.suggestedSection.title": "建议",
    "moveToModal.teamsSection.title": "团队空间",
    "moveToModal.workspaceSection.title": "工作区",
    "moveToOrCreateMenu.createSubpage.description":
      "在当前块内，在你的光标所在的位置创建一个新的子页面。",
    "moveToOrCreateMenu.newPageIn.description":
      "在任何现有页面内创建一个新页面，然后一次性地链接到此页面。",
    "moveToOrCreateMenu.turnInto.description":
      "将块转换为任何现有数据库或页面内的新页面。",
    "newBadge.label": "新",
    "newBadgeComponent.label": "新",
    "newBlock.abstract.description": "嵌入 Abstract 项目。",
    "newBlock.abstract.fuzzySearchKeywords": "Abstract",
    "newBlock.abstract.title": "Abstract",
    "newBlock.audio.description": "从 SoundCloud、Spotify 等嵌入音频。",
    "newBlock.audio.fuzzySearchKeywords":
      "Audio Sound Music 音频 yinpin yin'pin 音效 yinxiao yin'xiao 声音 shengyin sheng'yin 音乐 yinyue yin'yue",
    "newBlock.audio.title": "音频",
    "newBlock.boardView.description": "创建看板数据库视图。",
    "newBlock.boardView.title": "看板视图",
    "newBlock.bookmark.description": "通过链接创建可视化书签。",
    "newBlock.bookmark.fuzzySearchKeywords":
      "Web Link Bookmark 网页 wangye wang'ye 链接 lianjie lian'jie 书签 shuqian shu'qian",
    "newBlock.bookmark.title": "网页书签",
    "newBlock.breadcrumb.description": "显示目前页面的位置。",
    "newBlock.breadcrumb.fuzzySearchKeywords":
      "Breadcrumb 面包屑 mianbaoxie mian'bao'xie 页面路径 yemianlujing ye'mian'lu'jing 路径 lujing lu'jing",
    "newBlock.breadcrumb.title": "导航栏",
    "newBlock.bulletedList.description": "创建一个简单的项目符号列表。",
    "newBlock.bulletedList.fuzzySearchKeywords":
      "Bulleted Unordered List 项目符号 xiangmufuhao xiang'mu'fu'hao 无序 wuxu wu'xu 列表 liebiao lie'biao",
    "newBlock.bulletedList.title": "项目符号列表",
    "newBlock.calendarView.description": "创建日历数据库视图。",
    "newBlock.calendarView.title": "日历视图",
    "newBlock.callout.description": "将文字加强突出。",
    "newBlock.callout.fuzzySearchKeywords": "Callout 标注 biaozhu biao'zhu",
    "newBlock.callout.title": "标注",
    "newBlock.code.description": "摘取代码段。",
    "newBlock.code.fuzzySearchKeywords": "Code ``` 代码 daima dai'ma",
    "newBlock.code.title": "代码",
    "newBlock.codepen.description": "嵌入 Codepen 项目。",
    "newBlock.codepen.fuzzySearchKeywords": "CodePen Codepen",
    "newBlock.codepen.title": "CodePen",
    "newBlock.column2.description": "创建 2 列块。",
    "newBlock.column2.fuzzySearchKeywords": "创建 2 列块垂直",
    "newBlock.column2.title": "2 列",
    "newBlock.column3.description": "创建 3 列块。",
    "newBlock.column3.fuzzySearchKeywords": "c3 col3 column3 columns 3col",
    "newBlock.column3.title": "3 列",
    "newBlock.column4.description": "创建 4 列块。",
    "newBlock.column4.fuzzySearchKeywords": "c4 col4 column4 columns 4col",
    "newBlock.column4.title": "4 列",
    "newBlock.column5.description": "创建 5 列块。",
    "newBlock.column5.fuzzySearchKeywords": "c5 col5 column5 columns 5col",
    "newBlock.column5.title": "5 列",
    "newBlock.columnList.description": "创建列块。",
    "newBlock.columnList.fuzzySearchKeywords": "创建列块垂直",
    "newBlock.columnList.title": "列",
    "newBlock.database.description": "将新数据库添加为子页面。",
    "newBlock.database.title": "数据库",
    "newBlock.databaseFullPage.fuzzySearchKeywords": "数据库整页 db",
    "newBlock.databaseFullPage.title": "数据库 - 整页",
    "newBlock.databaseInline.fuzzySearchKeywords": "数据库行内 db",
    "newBlock.databaseInline.title": "数据库 - 行内",
    "newBlock.deepnote.description": "嵌入 Deepnote 块。",
    "newBlock.deepnote.fuzzySearchKeywords": "Deepnote",
    "newBlock.deepnote.title": "Deepnote",
    "newBlock.divider.description": "在视觉上创建分隔。",
    "newBlock.divider.fuzzySearchKeywords":
      "Horizontal Rule Divider --- —- 水平 shuiping shui'ping 分隔线 fengexian fen'ge'xian 分割尺 fengechi fen'ge'chi —— ",
    "newBlock.divider.title": "分隔线",
    "newBlock.drive.description": "嵌入谷歌文档、谷歌表格等。",
    "newBlock.drive.fuzzySearchKeywords":
      "Google Drive 谷歌 guge gu'ge 网盘 wangpan wang'pan 云盘 yunpan yun'pan",
    "newBlock.drive.title": "谷歌云端硬盘",
    "newBlock.embed.description": "适用于 PDF、谷歌地图等。",
    "newBlock.embed.fuzzySearchKeywords": "Embed iFrame 嵌入 qianru qian'ru",
    "newBlock.embed.title": "嵌入",
    "newBlock.equation.description": "显示独立的数学公式块。",
    "newBlock.equation.fuzzySearchKeywords":
      "LaTeX Math Block Equation $ 数学 shuxue shu'xue 区块 qukuai qu'kuai 方程式 fangchengshi fang'cheng'shi 公式 gongshi gong'shi 算式 suanshi suan'shi 等式 dengshi deng'shi 表达式 biaodashi biao'da'shi",
    "newBlock.equation.title": "公式块",
    "newBlock.excalidraw.description": "嵌入Excalidraw白板。",
    "newBlock.excalidraw.fuzzySearchKeywords": "Excalidraw Xcalidro",
    "newBlock.excalidraw.title": "Excalidraw",
    "newBlock.factory.description": "点击即可快速重复特定区块。",
    "newBlock.factory.fuzzySearchKeywords":
      "Template Duplicate Button 模板 muban mu'ban 复制 fuzhi fu'zhi 按钮 anniu an'niu 副本 fuben fu'ben",
    "newBlock.factory.title": "模板按钮",
    "newBlock.figma.description": "嵌入 Figma 文件。",
    "newBlock.figma.fuzzySearchKeywords": "Figma",
    "newBlock.figma.title": "Figma",
    "newBlock.file.description": "上传或以链接嵌入。",
    "newBlock.file.fuzzySearchKeywords": "File 文件 wenjian wen'jian",
    "newBlock.file.title": "文件",
    "newBlock.framer.description": "嵌入 Framer 原型。",
    "newBlock.framer.fuzzySearchKeywords": "Framer",
    "newBlock.framer.title": "Framer",
    "newBlock.fullPageBoard.fuzzySearchKeywords":
      "Board - Full page 看板 kanban kan'ban 整页 zhengye zheng'ye",
    "newBlock.fullPageBoardDatabase.description": "将看板数据库添加为子页面。",
    "newBlock.fullPageBoardDatabase.fuzzySearchKeywords": "看板数据库 - 整页",
    "newBlock.fullPageBoardDatabase.title": "看板数据库 - 整页",
    "newBlock.fullPageCalendar.fuzzySearchKeywords":
      "Calendar - Full page 日历 rili ri'li 整页 zhengye zheng'ye",
    "newBlock.fullPageCalendarDatabase.description":
      "将日历数据库添加为子页面。",
    "newBlock.fullPageCalendarDatabase.fuzzySearchKeywords":
      "日历数据库 - 整页",
    "newBlock.fullPageCalendarDatabase.title": "日历数据库 - 整页",
    "newBlock.fullPageGallery.fuzzySearchKeywords":
      "Gallery - Full page 画廊 hualang hua'lang 整页 zhengye zheng'ye",
    "newBlock.fullPageGalleryDatabase.description":
      "将画廊数据库添加为子页面。",
    "newBlock.fullPageGalleryDatabase.fuzzySearchKeywords": "画廊数据库 - 整页",
    "newBlock.fullPageGalleryDatabase.title": "画廊数据库 - 整页",
    "newBlock.fullPageList.fuzzySearchKeywords":
      "List - Full page 列表 liebiao lie'biao 整页 zhengye zheng'ye",
    "newBlock.fullPageListDatabase.description": "将列表数据库添加为子页面。",
    "newBlock.fullPageListDatabase.fuzzySearchKeywords": "列表数据库 - 整页",
    "newBlock.fullPageListDatabase.title": "列表数据库 - 整页",
    "newBlock.fullPageTable.fuzzySearchKeywords":
      "Table - Full page 表格 biaoge biao'ge 整页 zhengye zheng'ye",
    "newBlock.fullPageTableDatabase.description": "将表格数据库添加为子页面。",
    "newBlock.fullPageTableDatabase.fuzzySearchKeywords": "表格数据库 - 整页",
    "newBlock.fullPageTableDatabase.title": "表格数据库 - 整页",
    "newBlock.fullPageTimeline.fuzzySearchKeywords":
      "Timeline - Full page 时间轴 shijianzhou shi'jian'zhou 整页 zhengye zheng'ye",
    "newBlock.fullPageTimelineDatabase.description":
      "将时间轴数据库添加为子页面。",
    "newBlock.fullPageTimelineDatabase.fuzzySearchKeywords":
      "时间轴数据库 - 整页",
    "newBlock.fullPageTimelineDatabase.title": "时间轴数据库 - 整页",
    "newBlock.galleryView.description": "创建画廊数据库视图。",
    "newBlock.galleryView.title": "画廊视图",
    "newBlock.gist.description": "嵌入 GitHub Gist。",
    "newBlock.gist.fuzzySearchKeywords": "GitHub Gist",
    "newBlock.gist.title": "GitHub Gist",
    "newBlock.header.description": "大大的标题。",
    "newBlock.header.fuzzySearchKeywords": "Heading 1 # 标题 biaoti biao'ti",
    "newBlock.header.title": "标题 1",
    "newBlock.hex.description": "嵌入十六进制单元格。",
    "newBlock.hex.fuzzySearchKeywords": "十六进制",
    "newBlock.hex.title": "十六进制",
    "newBlock.image.description": "上传或以链接嵌入。",
    "newBlock.image.fuzzySearchKeywords":
      "Image Picture 图片 tupian tu'pian 图像 tuxiang tu'xiang 图形 tuxing tu'xing",
    "newBlock.image.title": "图片",
    "newBlock.inlineBoard.fuzzySearchKeywords":
      "Board - Inline 看板 kanban kan'ban 内嵌 neiqian nei'qian",
    "newBlock.inlineCalendar.fuzzySearchKeywords":
      "Calendar - Inline 日历 rili ri'li 内嵌 neiqian nei'qian",
    "newBlock.inlineGallery.fuzzySearchKeywords":
      "Gallery - Inline 画廊 hualang hua'lang 内嵌 neiqian nei'qian",
    "newBlock.inlineList.fuzzySearchKeywords":
      "List - Inline 列表 liebiao lie'biao 内嵌 neiqian nei'qian",
    "newBlock.inlineTable.fuzzySearchKeywords":
      "Table - Inline 表格 biaoge biao'ge 内联 neilian nei'lian",
    "newBlock.inlineTimeline.fuzzySearchKeywords":
      "Timeline - Inline 时间轴-内联 shijianzhou-neilian shi'jian'zhou'-'nei'lian",
    "newBlock.inlineTimelineDatabase.description":
      "将时间轴数据库添加到此页面。",
    "newBlock.inlineTimelineDatabase.fuzzySearchKeywords":
      "时间轴数据库 - 行内",
    "newBlock.inlineTimelineDatabase.title": "时间轴数据库 - 行内",
    "newBlock.invision.description": "嵌入 Invision 项目。",
    "newBlock.invision.fuzzySearchKeywords": "Invision",
    "newBlock.invision.title": "Invision",
    "newBlock.linkToCollection.description": "将现有数据库添加到此页面。",
    "newBlock.linkToCollection.fuzzySearchKeywords":
      "Create linked database 创建 chuangjian chuang'jian 链接 lianjie lian'jie 数据库 shujuku shu'ju'ku",
    "newBlock.linkToPage.description": "链接到现有页面。",
    "newBlock.linkToPage.fuzzySearchKeywords":
      "Link to page ltp 链接 lianjie lian'jie 页面 yemian ye'mian",
    "newBlock.linkToPage.title": "链接到页面",
    "newBlock.linkedViewOfCollection.description": "将现有数据库添加到此页面。",
    "newBlock.linkedViewOfCollection.fuzzySearchKeywords":
      "创建数据库 db 的链接视图",
    "newBlock.linkedViewOfCollection.title": "链接的视图",
    "newBlock.listView.description": "创建列表数据库视图。",
    "newBlock.listView.title": "列表视图",
    "newBlock.loom.description": "嵌入 Loom 录像。",
    "newBlock.loom.fuzzySearchKeywords": "Loom",
    "newBlock.loom.title": "Loom",
    "newBlock.maps.description": "嵌入谷歌地图。",
    "newBlock.maps.fuzzySearchKeywords":
      "Google Maps 谷歌 guge gu'ge 地图 ditu di'tu",
    "newBlock.maps.title": "谷歌地图",
    "newBlock.mermaidCode.description": "通过编写代码创建图表。",
    "newBlock.mermaidCode.fuzzySearchKeywords":
      "mermaid 图形 graphviz 流程图代码",
    "newBlock.mermaidCode.title": "代码 - Mermaid",
    "newBlock.miro.description": "嵌入 Miro 画板。",
    "newBlock.miro.fuzzySearchKeywords": "Miro",
    "newBlock.miro.title": "Miro",
    "newBlock.numberedList.description": "创建一个带有序号的列表。",
    "newBlock.numberedList.fuzzySearchKeywords":
      "Numbered Ordered List 编号 bianhao bian'hao 有序 youxu you'xu 列表 liebiao lie'biao 序号 xuhao xu'hao",
    "newBlock.numberedList.title": "有序列表",
    "newBlock.page.description": "在此页面中嵌入子页面。",
    "newBlock.page.fuzzySearchKeywords": "Page 页面 yemian ye'mian",
    "newBlock.page.title": "页面",
    "newBlock.pdf.description": "嵌入 PDF 文件。",
    "newBlock.pdf.fuzzySearchKeywords": "PDF P'D'F",
    "newBlock.pdf.title": "PDF",
    "newBlock.quote.description": "摘取引用。",
    "newBlock.quote.fuzzySearchKeywords": "Quote 引用 yinyong yin'yong",
    "newBlock.quote.title": "引用",
    "newBlock.replit.description": "嵌入Repl。",
    "newBlock.replit.fuzzySearchKeywords": "Replit Repl",
    "newBlock.replit.title": "Replit",
    "newBlock.simple_table.description": "为表格内容添加表格",
    "newBlock.simple_table.fuzzySearchKeywords": "表",
    "newBlock.simple_table.title": "表",
    "newBlock.sketch.description": "嵌入Sketch文档。",
    "newBlock.sketch.fuzzySearchKeywords": "Sketch",
    "newBlock.sketch.title": "Sketch",
    "newBlock.subHeader.description": "中标题。",
    "newBlock.subHeader.fuzzySearchKeywords":
      "sub heading 2 ## 子标题 zibiaoti zi'biao'ti 副标题 fubiaoti fu'biao'ti 中标题 zhongbiaoti zhong'biao'ti",
    "newBlock.subHeader.title": "标题 2",
    "newBlock.subSubHeader.description": "小标题。",
    "newBlock.subSubHeader.fuzzySearchKeywords":
      "sub heading 3 ### 小标题 xiaobiaoti xiao'biao'ti 子标题 zibiaoti zi'biao'ti",
    "newBlock.subSubHeader.title": "标题 3",
    "newBlock.tab.description": "选项卡",
    "newBlock.tab.keywords": "选项卡",
    "newBlock.tab.title": "创建制表符块",
    "newBlock.tableOfContents.description": "显示页面大纲。",
    "newBlock.tableOfContents.fuzzySearchKeywords":
      "TOC Table of Contents 目录 mulu mu'lu 大纲 dagang da'gang",
    "newBlock.tableOfContents.title": "目录",
    "newBlock.tableView.description": "为新数据库或现有数据库添加表格视图。",
    "newBlock.tableView.title": "表格视图",
    "newBlock.text.description": "以纯文本开始书写。",
    "newBlock.text.fuzzySearchKeywords":
      "Plain Text 纯文本 chunwenben chun'wen'ben 文本 wenben wen'ben 纯文字 chunwenzi chun'wen'zi 文字 wenzi wen'zi",
    "newBlock.text.title": "文本",
    "newBlock.timelineView.description": "创建时间轴数据库视图。",
    "newBlock.timelineView.title": "时间轴视图",
    "newBlock.toDo.description": "使用待办清单追踪任务。",
    "newBlock.toDo.fuzzySearchKeywords":
      "Todo To-Do Checkbox List 待办 daiban dai'ban 待办事项 daibanshixiang dai'ban'shi'xiang 复选框 fuxuankuang fu'xuan'kuang 清单 qingdan qing'dan 列表 liebiao lie'biao",
    "newBlock.toDo.title": "待办清单",
    "newBlock.toggle.description": "折叠列表可以选择性隐藏或显示内部内容。",
    "newBlock.toggle.fuzzySearchKeywords":
      "Toggle list 切换 qiehuan qie'huan 列表 liebiao lie'biao 切换列表 qiehuanliebiao qie'huan'lie'biao",
    "newBlock.toggle.title": "折叠列表",
    "newBlock.toggleFormatHeader.description": "将内容隐藏在大标题内。",
    "newBlock.toggleFormatHeader.fuzzySearchKeywords": "折叠标题 1 # h1",
    "newBlock.toggleFormatHeader.keywords": "折叠格式标题 1",
    "newBlock.toggleFormatHeader.title": "折叠标题 1",
    "newBlock.toggleFormatSubHeader.description": "将内容隐藏在中等标题内。",
    "newBlock.toggleFormatSubHeader.fuzzySearchKeywords": "切换子标题 2 ## h2",
    "newBlock.toggleFormatSubHeader.keywords": "折叠格式标题 2",
    "newBlock.toggleFormatSubHeader.title": "折叠标题 2",
    "newBlock.toggleFormatSubSubHeader.description": "将内容隐藏在小标题内。",
    "newBlock.toggleFormatSubSubHeader.fuzzySearchKeywords":
      "切换子子标题 3 ### h3",
    "newBlock.toggleFormatSubSubHeader.keywords": "折叠格式标题 3",
    "newBlock.toggleFormatSubSubHeader.title": "折叠标题 3",
    "newBlock.transclusionContainer.description": "同步所有页面的内容。",
    "newBlock.transclusionContainer.fuzzySearchKeywords":
      "Create synced block reference transclusion portal embed 同步 tongbu tong'bu",
    "newBlock.transclusionContainer.title": "同步块",
    "newBlock.tweet.description": "嵌入推文。",
    "newBlock.tweet.fuzzySearchKeywords": "Tweet 推文 tuiwen tui'wen",
    "newBlock.tweet.title": "推文",
    "newBlock.typeform.description": "嵌入 Typeform 表单。",
    "newBlock.typeform.fuzzySearchKeywords": "Typeform",
    "newBlock.typeform.title": "Typeform",
    "newBlock.video.description": "从 YouTube、Vimeo 等嵌入视频。",
    "newBlock.video.fuzzySearchKeywords": "Video 视频 shipin shi'pin",
    "newBlock.video.title": "视频",
    "newBlock.whimsical.description": "嵌入 Whimsical 画板。",
    "newBlock.whimsical.fuzzySearchKeywords": "Whimsical",
    "newBlock.whimsical.title": "Whimsical",
    "newDiscussionMenu.discardCommentConfirmationDialog.discardButton.label":
      "放弃",
    "newDiscussionMenu.discardCommentConfirmationDialog.prompt":
      "你想放弃这条评论吗？",
    "notificationActions.archiveNotificationsError.message": "出了些问题。",
    "notificationAndPersonalSettings.notificationSection.title": "我的通知",
    "notificationAndPersonalSettings.settingsSection.title": "我的设置",
    "notificationSettings.desktopNotificationSettings.description":
      "通过你的桌面应用接收提及和评论的即时推送通知。",
    "notificationSettings.desktopNotificationSettings.title": "桌面推送通知",
    "notificationSettings.emailAlwaysNotificationSettings.description":
      "通过电子邮件接收更新，即使你在应用上处于活动状态。",
    "notificationSettings.emailAlwaysNotificationSettings.title":
      "始终发送电子邮件通知",
    "notificationSettings.emailNotificationSettings.description":
      "通过电子邮件接收你关注的所有页面的编辑摘要、评论和提及。",
    "notificationSettings.emailNotificationSettings.title": "电子邮件通知",
    "notificationSettings.helpButton.caption": "了解通知与设置",
    "notificationSettings.mobilePushNotificationSettings.description":
      "通过你的移动应用接收提及和评论的推送通知。",
    "notificationSettings.mobilePushNotificationSettings.title":
      "移动端推送通知",
    "notificationSettingsButton.goOnline.prompt": "请连接网络后设置。",
    "notificationSettingsButton.mobileSidebar.label": "通知与设置",
    "notificationSettingsButton.mobileSidebar.title": "通知与设置",
    "notificationSettingsButton.rightActionButton.done": "完成",
    "notificationUpdates.offline.message": "请连接网络后查看动态。",
    "notificationUpdates.unknownErrorMessage": "出了些问题。",
    "notionAppContainer.dialog.mismatchedOriginURL.okayButton.label": "好的",
    "notionAppContainer.dialog.notionAppNotInApplications.message":
      "请将 Notion 应用程序移至 /Applications 文件夹，以使自动更新程序正常工作。",
    "numberedListBlock.placeholder.label": "项目",
    "oauthAuthorization.loadingMessage": "正在授权…",
    "oauthAuthorizationPage.error.cancelButton.label": "取消",
    "oauthAuthorizationPage.error.clientNotFound.body":
      "客户端 ID 缺失或不完整。请参阅<inlinetextlink>开发人员文档</inlinetextlink>以获得更多帮助。",
    "oauthAuthorizationPage.error.genericError.title": "出了些问题",
    "oauthAuthorizationPage.error.integrationAlreadyInstalled.body":
      "你可以在“设置”中查看和删除已添加的集成。",
    "oauthAuthorizationPage.error.integrationAlreadyInstalled.openWorkspaceSettingsButton.label":
      "打开设置",
    "oauthAuthorizationPage.error.integrationAlreadyInstalled.title":
      "此集成已添加到 {workspaceName}",
    "oauthAuthorizationPage.error.integrationNotApproved.body":
      "有关更多信息，请联系系统管理员。",
    "oauthAuthorizationPage.error.integrationNotApproved.title":
      '你无权将集成"{integrationName}"添加到 {workspaceName}',
    "oauthAuthorizationPage.error.invalidClientId.body":
      "客户端 ID 缺失或不完整。请参阅<inlinetextlink>开发人员文档</inlinetextlink>以获得更多帮助。",
    "oauthAuthorizationPage.error.invalidRedirectUri.body":
      "redirect_uri 缺失或无效。请参阅<inlinetextlink>开发人员文档</inlinetextlink>以获得更多帮助。",
    "oauthAuthorizationPage.error.invalidResponseType":
      "response_type 缺失或无效。请参阅<inlinetextlink>开发人员文档</inlinetextlink>以获得更多帮助。",
    "oauthAuthorizationPage.error.notAnAdmin.body":
      "请与管理员联系以授予你访问权限，或切换到其他工作区。",
    "oauthAuthorizationPage.error.notAnAdmin.switchWorkspaceButton.label":
      "切换工作区",
    "oauthAuthorizationPage.error.notAnAdmin.title":
      "不允许向 {workspaceName} 添加集成",
    "oauthAuthorizationPage.permissionStep.cancelButton.label": "取消",
    "oauthAuthorizationPage.permissionStep.continueButton.label": "选择页面",
    "oauthAuthorizationPage.permissionStep.finishButton.label": "允许访问",
    "oauthAuthorizationPage.permissionStep.integrationApprovalNotice":
      "授权此集成将其添加到工作区的批准列表中。其他工作区成员将能够安装此集成。",
    "oauthAuthorizationPage.permissionStep.intro":
      "<inlinetextlink>{integrationName}</inlinetextlink> 想要",
    "oauthAuthorizationPage.permissionStep.permissionListItem.addNewPages":
      "向 {workspaceName} 添加新页面",
    "oauthAuthorizationPage.permissionStep.permissionListItem.addNewPages.details":
      "{integrationName} 将能够在其有权访问的页面内添加新页面。",
    "oauthAuthorizationPage.permissionStep.permissionListItem.insertContent":
      "在你选择的页面中创建新内容",
    "oauthAuthorizationPage.permissionStep.permissionListItem.insertContent.description":
      "“{integrationName}”将能够向你在下一步选择的页面添加新内容或子页面。你稍后还可以通过“分享”菜单与“{integrationName}”分享页面。",
    "oauthAuthorizationPage.permissionStep.permissionListItem.readContent":
      "查看你选择的页面",
    "oauthAuthorizationPage.permissionStep.permissionListItem.readContent.description":
      "“{integrationName}”将能够查看你在下一步选择的页面。你稍后还可以通过“分享”菜单与“{integrationName}”分享页面。",
    "oauthAuthorizationPage.permissionStep.permissionListItem.updateContent":
      "编辑你选择的页面",
    "oauthAuthorizationPage.permissionStep.permissionListItem.updateContent.description":
      "“{integrationName}”将能够编辑你在下一步选择的页面。你稍后还可以通过“分享”菜单与“{integrationName}”分享页面。",
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewAndEditPages":
      "查看和编辑你选择的页面",
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewAndEditPages.description":
      "{integrationName} 将能够查看和编辑你在下一步选择的页面。你稍后还可以通过“分享”菜单与 {integrationName} 分享页面。",
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewUsers":
      "查看工作区用户",
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewUsers.detail":
      '"{integrationName}"将能够查看所有工作区成员和访客的基本信息，例如他们的姓名和个人资料图片，但不能查看他们的电子邮件地址。',
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewUsersAndEmail":
      "查看工作区用户及其邮箱地址",
    "oauthAuthorizationPage.permissionStep.permissionListItem.viewUsersAndEmail.detail":
      "“{integrationName}”将能够查看有关所有工作区成员和访客数据的基本信息，包括他们的姓名、个人资料图片和电子邮件地址。",
    "oauthAuthorizationPage.permissionStep.title":
      "<inlinetextlink>{integrationName}</inlinetextlink> 想要访问 {workspaceName}",
    "oauthAuthorizationPage.permissionStep.warning.body":
      "如果继续，你可能会共享敏感信息。Notion 不会审核第三方集成，例如“{integrationName}”。通过查看其<privacypolicylink>隐私政策</privacypolicylink>和<termsofservicelink>服务条款</termsofservicelink>了解“{integrationName}”如何处理你的数据。",
    "oauthAuthorizationPage.permissionStep.warning.title":
      "确保你信任“{integrationName}” ({redirectUriDomain})",
    "oauthAuthorizationPage.selectPageStep.empty": "内无页面",
    "oauthAuthorizationPage.selectPagesStep.backButton.label": "返回",
    "oauthAuthorizationPage.selectPagesStep.finishButton.label": "允许访问",
    "oauthAuthorizationPage.selectPagesStep.pagePicker.manuallyAddedPagesSection.title":
      "手动添加",
    "oauthAuthorizationPage.selectPagesStep.pagePicker.privateSection.title":
      "私人",
    "oauthAuthorizationPage.selectPagesStep.pagePicker.search.placeholder":
      "在 {workspaceName} 中搜索页面",
    "oauthAuthorizationPage.selectPagesStep.pagePicker.sharedSection.title":
      "已共享",
    "oauthAuthorizationPage.selectPagesStep.pagePicker.workspaceSection.title":
      "工作区",
    "oauthAuthorizationPage.selectPagesStep.title":
      "允许“{integrationName}”访问这些页面",
    "oauthAuthorizationPage.workspaceSwitcher.disabledWorkspace.tooltip":
      "此集成只能由成员或管理员添加。",
    "oauthPageSearchResults.disabledResult.byAncestor.message":
      "已通过 {ancestorPageName} 添加",
    "oauthPageSearchResults.disabledResult.bySelf.message": "已添加",
    "oauthPageSearchResults.noResults.placeholder": "无结果",
    "offlineErrors.offlineErrorMessage": "脱机。",
    "onboarding.desktopLogoutOption.text":
      "你正在为 {userEmail} 新建帐户。{br}如果你不打算设置新帐户，可以使用<closelink>另一个邮箱地址登录。</closelink>",
    "onboarding.workspaceCreate.buttonLabel.title": "添加 logo",
    "onboardingActions.closeOnboardingDialog.existingUser.confirmCloseButton.label":
      "回到之前的工作区",
    "onboardingActions.closeOnboardingDialog.existingUser.continueButton.label":
      "继续设置",
    "onboardingActions.closeOnboardingDialog.existingUser.subtitle":
      "你将回到之前的工作区。",
    "onboardingActions.closeOnboardingDialog.existingUser.title":
      "取消设置新的工作区？",
    "onboardingActions.closeOnboardingDialog.newUser.confirmCloseButton.label":
      "返回主页",
    "onboardingActions.closeOnboardingDialog.newUser.continueButton.label":
      "继续设置",
    "onboardingActions.closeOnboardingDialog.newUser.subtitle":
      "你将回到 Notion 主页。",
    "onboardingActions.closeOnboardingDialog.newUser.title": "取消新帐户设置？",
    "onboardingActions.onboardingErrorDialog.closeButton.label": "关闭",
    "onboardingActions.onboardingErrorDialog.message": "糟糕，出了些问题。",
    "onboardingActions.onboardingErrorDialog.startOverButton.label": "重新开始",
    "onboardingAppDownload.step.downloadMacButton": "下载 Windows 应用",
    "onboardingAppDownload.step.downloadWindowsButton": "下载 Windows 应用",
    "onboardingAppDownload.step.title": "下载 Notion",
    "onboardingAppDownload.subtitle.mac":
      "使用 Mac 版 Notion 应用，以获得更好的离线和通知体验。",
    "onboardingAppDownload.subtitle.macAndWindows":
      "使用 Mac 版或 Windows 版 Notion 应用，以获得更好的离线和通知体验。",
    "onboardingAppDownload.subtitle.windows":
      "使用 Windows 版 Notion 应用，以获得更好的离线和通知体验。",
    "onboardingChecklist.collab.comments.text":
      "请向团队成员留言反馈、提问和意见。直接在页面的评论主题中讨论想法，协调您的意见并做出决定。",
    "onboardingChecklist.collab.comments.title": "评论",
    "onboardingChecklist.collab.mentions.text":
      "要支持团队成员，请在页面或评论中键入@，然后输入团队成员的姓名。收到通知的团队成员可以立即加入。",
    "onboardingChecklist.collab.mentions.title": "提及",
    "onboardingChecklist.createContent.block.title": "块",
    "onboardingChecklist.createContent.blockTypes.text":
      "块是组成Notion页面的元素。块可以包含不同类型的内容，包括文本、图像、复选框和表格。",
    "onboardingChecklist.createContent.rearrangeBlocks.text":
      "将块替换为其他内容类型，以便以新的方式使用、显示和更详细地表达包括的信息。",
    "onboardingChecklist.createContent.rearrangeBlocks.title": "重新排列块",
    "onboardingChecklist.createContent.transformBlocks.title": "改变块",
    "onboardingChecklist.createPages.slashCommand.text":
      "如果键入/，则会出现一个菜单，其中包含可以添加到Notion页面的所有内容类型。😋",
    "onboardingChecklist.createPages.slashCommand.title": "斜线命令",
    "onboardingChecklist.createPages.subPage.text":
      "在页面上输入/页面命令以创建子页面。您可以更有层次地组织你的内容，方便随时查找。",
    "onboardingChecklist.createPages.subPage.title": "子页",
    "onboardingChecklist.createPages.text":
      "单击工作区左下角的+新页面或侧栏中的+按钮，即可创建新页面。",
    "onboardingChecklist.createPages.title": "创建新页面",
    "onboardingChecklist.share.addTeammates.text":
      "和团队一起工作吗？通过从“设置”和“成员”菜单添加团队成员，您可以共享所有相同的Notion工作空间。",
    "onboardingChecklist.share.addTeammates.title": "添加团队成员",
    "onboardingChecklist.share.button.text":
      "使用页面右上角的“分享”按钮，您可以邀请非工作区成员以及非成员进行协作。",
    "onboardingChecklist.share.button.title": "“分享”按钮",
    "onboardingChecklist.tipsAndTricks.downloadApps.text":
      "下载<a1>桌面</a1>或<a2>移动</a2>应用。",
    "onboardingChecklist.tipsAndTricks.exploreTemplates.text":
      "<link>查看模板</link>",
    "onboardingChecklist.tipsAndTricks.import.text":
      "查看我们的<a>帮助中心</a>了解更多信息！",
    "onboardingChecklist.tipsAndTricks.templates.text":
      "使用我们的<a>模板画廊</a>浏览模板！",
    "onboardingChecklist.tipsAndTricks.title": "了解详情",
    "onboardingChecklist.whatIsNotion.mainUsecases":
      "使用Notion，您可以执行各种任务，包括这些任务。",
    "onboardingChecklist.whatIsNotion.title": "Notion简介",
    "onboardingChecklist.whatIsNotion.youtubeVideoLink":
      "https://www.youtube.com/embed/oTahLEX3NXo",
    "onboardingChecklistButton.collaborateWithOthers.displayName":
      "与其他用户协作",
    "onboardingChecklistButton.createContent.displayName": "创建内容",
    "onboardingChecklistButton.createPages.displayName": "创建页面",
    "onboardingChecklistButton.getMoreHelp.button": "获得更多帮助",
    "onboardingChecklistButton.nextStage.complete": "完成！🎉",
    "onboardingChecklistButton.shareYourWork.displayName": "工作共享",
    "onboardingChecklistButton.stageFooter.next": "下一个",
    "onboardingChecklistButton.stageTracker":
      "第 {currentStageNumber} 个，共 {totalStageNumber} 个",
    "onboardingChecklistButton.stagesComplete":
      "已查看第 {numStagesComplete} 个，共 {numTotalStages} 个。",
    "onboardingChecklistButton.subtitleText":
      "欢迎使用一体化的 Notion 全能工作区。从这里开始了解基础知识。",
    "onboardingChecklistButton.tipsAndTricks.displayName": "帮助和技巧",
    "onboardingChecklistButton.title": "<b>Notion 基础知识</b>",
    "onboardingChecklistButton.tooltip": "Notion 基础知识",
    "onboardingChecklistButton.whatIsNotion.displayName": "Notion 是什么？",
    "onboardingGDPR.agreeButton.label": "同意",
    "onboardingGDPR.consentInfo.paragraph1.body":
      "我们使用 Cookie 来安全地识别你的帐户，让你保持登录状态，并改进我们的服务。",
    "onboardingGDPR.consentInfo.paragraph2.body":
      "我们透过行为数据分析来改进产品并解决客户的问题。其中包括 {intercomLink} 、 {amplitudeLink} 、 {segmentLink} 、 {snowflakeLink} 、 {crashlyticsLink}和{logglyLink}。我们将默认启用行为数据分析，因为它对我们的业务至关重要。",
    "onboardingGDPR.consentInfo.paragraph3.body":
      "你可以通过发送电子邮件到 {emailLink} 来撤销你对行为数据分析的许可。",
    "onboardingGDPR.consentInfo.paragraph4.body":
      "我们偶尔会发送产品更新和市场营销的电子邮件。每封电子邮件都会附上能让你立即退订的链接。",
    "onboardingGDPR.consentInfo.paragraph5.body":
      "请阅读我们的<termslink>服务条款与隐私政策</termslink>以获取更多信息。",
    "onboardingGDPR.disagreeButton.label": "不同意",
    "onboardingGDPR.mobileAgreeButton.label": "同意",
    "onboardingGDPR.mobileDisagreeButton.label": "不同意",
    "onboardingGDPR.step.title": "隐私与数据收集",
    "onboardingHelpers.personalWorkspaceName": "{userName}的 Notion",
    "onboardingInvite.addEmail.caption":
      "输入或粘贴一个或多个邮箱地址，以逗号、空格或换行符分隔。",
    "onboardingInvite.bulkInvites.placeholder":
      "penny@myteam.com, varun@company.com, vicky@company.com, ...",
    "onboardingInvite.chrome.subtitle": "邀请你的队友以充分利用 Notion。",
    "onboardingInvite.chrome.title": "邀请队友",
    "onboardingInvite.desktopButton.invitedEmails.finishButton":
      "邀请并转到 Notion",
    "onboardingInvite.desktopButton.labelWithAction": "邀请并继续",
    "onboardingInvite.email.placeholder": "邮箱地址",
    "onboardingInvite.emailDomainAutoJoinCheckbox.label":
      "允许拥有 <b>@{emailDomain}</b> 邮箱地址的任何人加入此工作区",
    "onboardingInvite.emails.addAnotherButtonText": "添加另一个",
    "onboardingInvite.emails.addMoreOrInviteInBulkText": "添加更多或批量邀请",
    "onboardingInvite.emails.sendInvites": "发送邀请",
    "onboardingInvite.finishButton": "转到 Notion",
    "onboardingInvite.invalidEmails.error.message":
      "有些邮箱地址似乎无效。再试一次？",
    "onboardingInvite.mobile.copyButton.title": "复制邀请链接",
    "onboardingInvite.mobileStep.subtitle": "Notion 适合任何规模的团队。",
    "onboardingInvite.mobileStep.title": "邀请队友",
    "onboardingInvite.shareInviteLink.caption":
      "当你的队友点击此链接时，他们会自动添加到你的工作区。",
    "onboardingInvite.sharingButton.copied": "已复制！",
    "onboardingInvite.sharingButton.copy": "获取可共享的链接",
    "onboardingInvite.sharingButton.tooltip.copy": "使用此链接邀请队友",
    "onboardingInviteNew.error.invalidEmail.message": "无效的邮箱地址。",
    "onboardingMobileScroller.continueButton.label": "继续",
    "onboardingMobileTutorial.button.skip": "跳过",
    "onboardingMobileTutorial.button.takeMeToNotion": "转到 Notion",
    "onboardingMobileTutorial.getStartedButton.label": "立即开始",
    "onboardingMobileTutorial.nextButton.label": "下一个",
    "onboardingPopup.next": "下一个",
    "onboardingPopup.skip": "跳过其余部分",
    "onboardingProfile.addProfilePhotoButton.label": "添加照片",
    "onboardingProfile.changeProfilePhotoButton.label": "更改",
    "onboardingProfile.continueButton.label": "继续",
    "onboardingProfile.dialogError.photoUploadFailure.message": "上传失败。",
    "onboardingProfile.mobileNameInput.placeholder":
      "例如 Ada Lovelace、Ada、AL",
    "onboardingProfile.mobileNameQuestion.label": "我们应该怎么称呼你？",
    "onboardingProfile.mobileStage.subtitle": "首先，请向我们介绍一下你自己。",
    "onboardingProfile.mobileStage.title": "欢迎来到 Notion",
    "onboardingProfile.nameInput.placeholder": "例如 Ada Lovelace、Ada、AL",
    "onboardingProfile.nameQuestion.label": "我们应该怎么称呼你？",
    "onboardingProfile.nameUndefinedError.message": "未填写名称。",
    "onboardingProfile.passwordGuidelines":
      "密码长度至少为 15 个字母，或者长度至少为 10 个字符且同时包含字母和数字。",
    "onboardingProfile.passwordInput.label": "设置密码",
    "onboardingProfile.passwordInput.placeholder": "新密码",
    "onboardingProfile.passwordUndefinedError.message": "未填写密码。",
    "onboardingProfile.stage.subtitle": "首先，请向我们介绍一下你自己。",
    "onboardingProfile.stage.title": "欢迎来到 Notion",
    "onboardingProfile.uploading.text": "上传中…",
    "onboardingStateActions.creatingWorkspace.loadingMessage": "马上就好…",
    "onboardingStateActions.errorMessage.domainClaim.workspaceCreationPrevented":
      "工作区创建已禁用。请与系统管理员联系，以获得对工作区的访问权限或创建新的工作区。",
    "onboardingStateActions.errorMessage.domainClaim.workspaceCreationPreventedWithEmail":
      "你已登录 {userEmailAddress}，但无权访问任何工作区。请联系你的 IT 部门以获取 Notion 访问权限。",
    "onboardingStateActions.errorMessage.noActionToPerform":
      "没有对{onboardingRedirectType}可执行的操作",
    "onboardingStateActions.errorMessage.spaceDidNotLoad": "无法加载工作区。",
    "onboardingStateActions.errorMessage.spaceDoesNotExist": "工作区不存在。",
    "onboardingStateActions.joiningWorkspace.loadingMessage": "正在加入团队…",
    "onboardingStateActions.navigatingToWorkspace.loadingMessage":
      "正在转到你的工作区……",
    "onboardingSurvey.cancelButton.label": "跳过",
    "onboardingSurvey.continueButton.label": "继续",
    "onboardingSurvey.persona.label": "你从事哪一类工作？",
    "onboardingSurvey.persona.popuplabel": "你的职能",
    "onboardingSurvey.subtitle": "我们将根据你的选择定制你的 Notion 体验。",
    "onboardingSurvey.teamRole.label": "你的角色是什么？",
    "onboardingSurvey.teamRole.popuplabel": "你的角色",
    "onboardingSurvey.title": "请向我们介绍一下你自己",
    "onboardingSurvey.usecase.label": "你打算用 Notion 做什么？",
    "onboardingSurvey.usecase.popuplabel": "用 Notion 来...",
    "onboardingSurvey.usecasesSelect.placeholder": "选择一个或多个...",
    "onboardingSurvey.usecasesSelect.plural.placeholder":
      "{count, plural, other {已选择 {count} 个}}",
    "onboardingTeamRoleSelect.teamRoleSelect.companyLead": "C 级或 VP",
    "onboardingTeamRoleSelect.teamRoleSelect.notLead": "我不管理团队",
    "onboardingTeamRoleSelect.teamRoleSelect.orgLead": "部门主管",
    "onboardingTeamRoleSelect.teamRoleSelect.placeholder": "选择团队角色",
    "onboardingTeamRoleSelect.teamRoleSelect.teamLead": "团队主管",
    "onboardingTeamRoleSelect.teamTypeMenu.title": "团队类型",
    "onboardingWorkspaceChoose.createSpaceOption.message": "创建新工作区",
    "onboardingWorkspaceChoose.joinWorkspaceButton.join.label": "加入",
    "onboardingWorkspaceChoose.joinWorkspaceButton.label": "{workspaceName}",
    "onboardingWorkspaceChoose.joinWorkspaceButton.memberCount.label":
      "{memberCount, plural, other {{memberCount} 个成员}}",
    "onboardingWorkspaceChoose.mobileStage.subtitle":
      "{numberOfWorkspaces, plural, other {看来你已被邀请到 {numberOfWorkspaces} 个工作区，现在就加入吧！}}",
    "onboardingWorkspaceChoose.mobileStage.title": "加入工作区",
    "onboardingWorkspaceChoose.stage.disableSpaceCreationFooter":
      "你的系统管理员已禁用创建工作区。",
    "onboardingWorkspaceChoose.stage.disableSpaceCreationTooltip":
      "你的系统管理员已禁用创建工作区。",
    "onboardingWorkspaceChoose.stage.subtitle":
      "{numberOfWorkspaces, plural, other {你已被邀请到 {numberOfWorkspaces} 个工作区。选择加入，或创建新的工作区。}}",
    "onboardingWorkspaceChoose.stage.subtitleWithNoCreateOption":
      "{numberOfWorkspaces, plural, other {您已受邀加入 {numberOfWorkspaces} 个工作区。请选择一个加入。}}",
    "onboardingWorkspaceChoose.stage.title": "与你的队友一起加入 Notion",
    "onboardingWorkspaceCreate.fieldUndefinedError.message":
      "未定义工作区创建字段。",
    "onboardingWorkspaceCreate.nextButton.labelInvite": "继续",
    "onboardingWorkspaceCreate.roleOnTeam.label": "在团队中的角色",
    "onboardingWorkspaceCreate.stage.subtitle": "为你的队友填写一些详细信息。",
    "onboardingWorkspaceCreate.stage.team.title": "创建团队工作区",
    "onboardingWorkspaceCreate.workspaceNameInput.hint": "你公司或组织的名称。",
    "onboardingWorkspaceCreate.workspaceNameInput.label": "工作区名称",
    "onboardingWorkspaceCreate.workspaceNameInput.placeholder": "Acme 公司",
    "onboardingWorkspaceMobileScroller.mobileCancelButton.label": "取消",
    "onboardingWorkspacePlanChoose.continueButton.label": "继续",
    "onboardingWorkspacePlanChoose.goToNotionButton.label": "带我去 Notion",
    "onboardingWorkspacePlanChoose.mobileStep.subtitle":
      "我们将通过你的选择简化初期设置。",
    "onboardingWorkspacePlanChoose.mobileStep.title": "我用 Notion 来…",
    "onboardingWorkspacePlanChoose.personalUseCaseButton.callout":
      "单人使用免费",
    "onboardingWorkspacePlanChoose.personalUseCaseButton.description":
      "写得更好，想得更清晰。一切井然有序。",
    "onboardingWorkspacePlanChoose.personalUseCaseButton.label": "为我自己",
    "onboardingWorkspacePlanChoose.step.subtitle":
      "我们将通过你的选择简化初期设置。",
    "onboardingWorkspacePlanChoose.step.title": "你打算如何使用 Notion？",
    "onboardingWorkspacePlanChoose.teamUseCaseButton.callout": "免费试用",
    "onboardingWorkspacePlanChoose.teamUseCaseButton.description":
      "协作处理你的文档、项目和知识库。",
    "onboardingWorkspacePlanChoose.teamUseCaseButton.label": "与我的团队",
    "outliner.NoDatabasesInside.placeholder": "里面没有数据库",
    "outliner.NoPagesInside.placeholder": "内无页面",
    "outlinerTeamOverflow.restoreArchivedTeam.disabledTooltipText":
      "只有团队空间所有者才能恢复已归档的团队空间。",
    "outlinerTeamOverflow.teamActions.restoreLabel": "恢复团队空间",
    "outlinerTeamToggleButton.joinTeamButton": "加入",
    "outlinerTeamToggleButton.joinedBadge": "已加入",
    "outlinerTeamToggleButton.numTeamMembers":
      "{numTeamMembers, plural, other {# 位成员}}",
    "outlinerTeamToggleButton2.joinTeamButton": "加入",
    "outlinerToggleButton.popup.buttonText": "好的",
    "outlinerToggleButton.popup.skipText": "清除模板",
    "outlinerViewAllMenuList.addToSidebar.tooltip": "添加到侧边栏",
    "outlinerViewAllMenuList.removeFromSidebar.tooltip": "从侧边栏移除",
    "outlinerViewAllPopover.menu.header": "已共享",
    "outlinerViewAllPopover.search.noMatchesPrompt": "未找到页面",
    "outlinerViewAllPopover.search.placeholder": "搜索共享页面",
    "outlinerViewAllPopover.search.teamPlaceholder": "搜索团队页面...",
    "outlinerViewAllPopover.search.teamPlaceholder2": "搜索 {teamName}...",
    "outlinerViewAllPopover.sortSelect.allPages": "所有页面",
    "outlinerViewAllPopover.sortSelect.menuTitle": "排序",
    "outlinerViewAllPopover.sortSelect.ownedPages": "拥有的页面",
    "outlinerViewAllPopover.sortSelect.sharedPages": "共享页面",
    "page.backlinks.label": "链接到此页面",
    "page.backlinks.more": "其他 {count} 个",
    "page.backlinks.privatePages":
      "{count, plural, other {{count} 个私人页面}}",
    "page.backlinks.privatePagesTooltip": "已在你无权访问的页面中同步。",
    "page.blockActionMenu.tooltip": "重命名、删除等…",
    "page.changeIcon.tooltip": "更改图标",
    "pageCover.changeCover.text": "更换封面",
    "pageCover.embedType.buttonText": "提交",
    "pageCover.embedType.caption": "适用于网络上任何图片。",
    "pageCover.embedType.placeholder": "粘贴图片链接…",
    "pageCover.embedType.title": "链接",
    "pageCover.errorDialogMessage.uploadFailed": "上传失败",
    "pageCover.fileType.caption": "宽于 {idealImageWidth} 像素的图片效果最佳。",
    "pageCover.gradientCategory.header": "颜色和渐变",
    "pageCover.gradients10.title": "渐变 10",
    "pageCover.gradients11.title": "渐变 11",
    "pageCover.gradients2.title": "渐变 2",
    "pageCover.gradients3.title": "渐变 3",
    "pageCover.gradients4.title": "渐变 4",
    "pageCover.gradients5.title": "渐变 5",
    "pageCover.gradients8.title": "渐变 8",
    "pageCover.metArnoldBocklin1880.subtitle": "1880，死者之岛",
    "pageCover.metArnoldBocklin1880.title": "阿诺德·勃克林",
    "pageCover.metBruegel1565.subtitle": "1565",
    "pageCover.metBruegel1565.title": "老彼得·勃鲁盖尔",
    "pageCover.metCamillePissarro1896.subtitle": "1896，阴天早晨的鲁昂",
    "pageCover.metCamillePissarro1896.title": "卡米耶·毕沙罗",
    "pageCover.metCanaletto1720.subtitle": "1720 年代",
    "pageCover.metCanaletto1720.title": "卡纳莱托",
    "pageCover.metCategory.header": "大都会艺术博物馆",
    "pageCover.metCezanne1890.subtitle": "1890，静物：苹果和报春花",
    "pageCover.metCezanne1890.title": "保罗·塞尚",
    "pageCover.metEdgarDegas1874.subtitle": "1874，舞蹈课",
    "pageCover.metEdgarDegas1874.title": "埃德加·德加",
    "pageCover.metEmanuelLeutze.subtitle": "1851，华盛顿横渡特拉华河",
    "pageCover.metEmanuelLeutze.title": "埃玛纽埃尔·洛伊茨",
    "pageCover.metFitzHenryLane.subtitle": "1854，金州号进入纽约港",
    "pageCover.metFitzHenryLane.title": "菲茨·亨利·莱恩",
    "pageCover.metFredericEdwinChurch1871.subtitle": "1871，帕特农神庙",
    "pageCover.metFredericEdwinChurch1871.title": "弗雷德里克·埃德温·丘奇",
    "pageCover.metGeorgesSeurat1884.subtitle": "1884，大碗岛的星期天下午练习版",
    "pageCover.metGeorgesSeurat1884.title": "乔治·秀拉",
    "pageCover.metGerome1890.subtitle": "1890，皮格马利翁和伽拉忒亚",
    "pageCover.metGerome1890.title": "让-里奥·杰洛姆",
    "pageCover.metGoya1789.subtitle": "1787",
    "pageCover.metGoya1789.title": "戈雅",
    "pageCover.metHenriRousseau1907.subtitle": "1907，猛狮就食",
    "pageCover.metHenriRousseau1907.title": "亨利·卢梭",
    "pageCover.metHenriTl1892.subtitle": "1892，Divan Japonais",
    "pageCover.metHenriTl1892.title": "亨利·德·土鲁斯-劳特累克",
    "pageCover.metHenryLerolle1885.subtitle": "1885，管风琴排练",
    "pageCover.metHenryLerolle1885.title": "亨利·勒罗尔",
    "pageCover.metHoracePippin.subtitle": "1945，维多利亚式室内 1",
    "pageCover.metHoracePippin.title": "霍勒斯·皮平",
    "pageCover.metJeanBeraud.subtitle": "1877，巴黎鲁莱圣斐理伯教堂的星期天",
    "pageCover.metJeanBeraud.title": "让·贝罗",
    "pageCover.metJohnSingerSargentMorocco.subtitle": "1879，摩洛哥",
    "pageCover.metJohnSingerSargentMorocco.title": "约翰·辛格·萨金特",
    "pageCover.metJosephHidley1870.subtitle": "1870，波斯滕基尔景观，纽约",
    "pageCover.metJosephHidley1870.title": "约瑟夫·希德利",
    "pageCover.metJulesTavernier1878.subtitle":
      "1878，在清澈湖中的地下圆形舞厅里跳舞，加州",
    "pageCover.metJulesTavernier1878.title": "朱尔斯·塔弗尼尔",
    "pageCover.metKlimt1912.subtitle": "1912",
    "pageCover.metKlimt1912.title": "古斯塔夫·克里姆特",
    "pageCover.metPatternsCategory.header": "大都会艺术博物馆 - 图案",
    "pageCover.metPaulSignac.subtitle": "1891，孔卡尔诺：傍晚的宁静",
    "pageCover.metPaulSignac.title": "保罗·希涅克",
    "pageCover.metSilkKashanCarpet.subtitle": "16 世纪",
    "pageCover.metSilkKashanCarpet.title": "真丝喀山地毯",
    "pageCover.metTerracottaFuneraryPlaque.subtitle":
      "约在公元前 520-公元前 510",
    "pageCover.metTerracottaFuneraryPlaque.title": "陪葬陶片",
    "pageCover.metTheUnicornInCaptivity.subtitle": "约 1495–1505",
    "pageCover.metTheUnicornInCaptivity.title": "被囚禁的独角兽",
    "pageCover.metVincentVanGoghCradle.subtitle": "1889，摇篮曲",
    "pageCover.metVincentVanGoghCradle.title": "文森特·梵高",
    "pageCover.metVincentVanGoghGinoux.subtitle":
      "1890，阿莱城的姑娘：吉努夫人",
    "pageCover.metVincentVanGoghGinoux.title": "文森特·梵高",
    "pageCover.metVincentVanGoghIrises.subtitle": "1890，鸢尾花",
    "pageCover.metVincentVanGoghIrises.title": "文森特·梵高",
    "pageCover.metVincentVanGoghOleanders.subtitle": "1888，夹竹桃",
    "pageCover.metVincentVanGoghOleanders.title": "文森特·梵高",
    "pageCover.metWilliamMorris1875.subtitle": "1875，万寿菊",
    "pageCover.metWilliamMorris1875.title": "威廉·莫里斯",
    "pageCover.metWilliamMorris1877Willow.subtitle": "1875，柳树枝",
    "pageCover.metWilliamMorris1877Willow.title": "威廉·莫里斯",
    "pageCover.metWilliamMorris1878.subtitle": "1878，鸟",
    "pageCover.metWilliamMorris1878.title": "威廉·莫里斯",
    "pageCover.metWilliamTurner1835.subtitle": "1835，威尼斯运河",
    "pageCover.metWilliamTurner1835.title": "威廉·特纳",
    "pageCover.metWinslowHomerMaineCoast.subtitle": "1896，缅因州海岸",
    "pageCover.metWinslowHomerMaineCoast.title": "温斯洛·霍默",
    "pageCover.metWoodcutsCategory.header": "大都会艺术博物馆 - 日本版画",
    "pageCover.mobileMenu.title": "页面封面",
    "pageCover.nasaBruceMccandlessSpacewalk.title": "布鲁斯·麦坎德利斯太空漫步",
    "pageCover.nasaBuzzAldrinOnTheMoon.subtitle": "1969",
    "pageCover.nasaBuzzAldrinOnTheMoon.title": "月球上的巴兹·奥尔德林",
    "pageCover.nasaCarinaNebula.title": "船底座星云",
    "pageCover.nasaCategory.header": "NASA 档案馆",
    "pageCover.nasaEagleInLunarOrbit.subtitle": "1969",
    "pageCover.nasaEagleInLunarOrbit.title": "月球轨道中的“鹰”",
    "pageCover.nasaEarthGrid.title": "地球网格",
    "pageCover.nasaEvaDuringSkylab3.subtitle": "1973",
    "pageCover.nasaEvaDuringSkylab3.title": "天空实验室 3 号飞行期间舱外活动",
    "pageCover.nasaFingerprintsOfWaterOnTheSand.title": "沙地上的水",
    "pageCover.nasaGreatSandyDesertAustralia.subtitle": "2013",
    "pageCover.nasaGreatSandyDesertAustralia.title": "澳大利亚大沙沙漠",
    "pageCover.nasaIbmType704.subtitle": "1957",
    "pageCover.nasaIbmType704.title": "IBM Type 704 系统",
    "pageCover.nasaMultiAxisGimbleRig.subtitle": "1959",
    "pageCover.nasaMultiAxisGimbleRig.title": "多轴万向节钻机",
    "pageCover.nasaNewYorkCityGrid.title": "纽约市规划网格",
    "pageCover.nasaOrionNebula.subtitle": "1994",
    "pageCover.nasaOrionNebula.title": "猎户座大星云",
    "pageCover.nasaReducedGravityWalkingSimulator.subtitle": "1963",
    "pageCover.nasaReducedGravityWalkingSimulator.title": "减重力步行模拟器",
    "pageCover.nasaRobertStewartSpacewalk.title": "罗伯特·斯图尔特太空漫步",
    "pageCover.nasaRobertStewartSpacewalk2.title": "罗伯特·斯图尔特太空漫步 2",
    "pageCover.nasaSpaceShuttleChallenger.subtitle": "1985",
    "pageCover.nasaSpaceShuttleChallenger.title": "挑战者号航天飞机",
    "pageCover.nasaSpaceShuttleColumbia.subtitle": "1986",
    "pageCover.nasaSpaceShuttleColumbia.title": "哥伦比亚号航天飞机",
    "pageCover.nasaSpaceShuttleColumbiaAndSunrise.subtitle": "1983",
    "pageCover.nasaSpaceShuttleColumbiaAndSunrise.title":
      "哥伦比亚号航天飞机和日出",
    "pageCover.nasaTheBlueMarble.subtitle": "1972",
    "pageCover.nasaTheBlueMarble.title": "蓝色弹珠",
    "pageCover.nasaTimPeakeSpacewalk.title": "蒂姆·皮克太空漫步",
    "pageCover.nasaTransonicTunnel.subtitle": "1990",
    "pageCover.nasaTransonicTunnel.title": "超音速风洞",
    "pageCover.nasaWrightsFirstFlight.subtitle": "1903",
    "pageCover.nasaWrightsFirstFlight.title": "莱特兄弟的第一次飞行",
    "pageCover.reposition.cancelText": "取消",
    "pageCover.reposition.text": "调整位置",
    "pageCover.rijksmuseumAvercamp1608.subtitle": "1608，冬季景观与溜冰者",
    "pageCover.rijksmuseumAvercamp1608.title": "亨德里克·阿弗坎普",
    "pageCover.rijksmuseumAvercamp1620.subtitle": "1620，享受小镇附近的冰",
    "pageCover.rijksmuseumAvercamp1620.title": "亨德里克·阿弗坎普",
    "pageCover.rijksmuseumCategory.header": "荷兰国立博物馆",
    "pageCover.rijksmuseumClaesz1628.subtitle": "1628，虚空静物：拔刺男孩",
    "pageCover.rijksmuseumClaesz1628.title": "彼得·克拉斯",
    "pageCover.rijksmuseumJanLievens1627.subtitle": "1627，静物：书",
    "pageCover.rijksmuseumJanLievens1627.title": "扬·利文斯",
    "pageCover.rijksmuseumJansz1636.subtitle": "1636，哈勒姆圣巴沃教堂内部",
    "pageCover.rijksmuseumJansz1636.title": "彼得·詹斯",
    "pageCover.rijksmuseumJansz1637.subtitle": "1637，乌得勒支的马里亚克大教堂",
    "pageCover.rijksmuseumJansz1637.title": "彼得·詹斯",
    "pageCover.rijksmuseumJansz1641.subtitle":
      "1641，乌得勒支玛丽亚教堂的中殿和合唱团",
    "pageCover.rijksmuseumJansz1641.title": "彼得·詹斯",
    "pageCover.rijksmuseumJansz1649.subtitle":
      "1649，阿森德尔夫特（Sendelft）的圣奥杜弗斯克教堂的内部",
    "pageCover.rijksmuseumJansz1649.title": "彼得·詹斯",
    "pageCover.rijksmuseumMignons1660.subtitle": "1660，静物：花和手表",
    "pageCover.rijksmuseumMignons1660.title": "亚伯拉罕·米尼翁",
    "pageCover.rijksmuseumRembrandt1642.subtitle": "1642，夜巡",
    "pageCover.rijksmuseumRembrandt1642.title": "伦勃朗·范·赖恩",
    "pageCover.rijksmuseumVermeerTheMilkmaid.subtitle": "1660，倒牛奶的女仆",
    "pageCover.rijksmuseumVermeerTheMilkmaid.title": "约翰尼斯·弗美尔",
    "pageCover.savePosition.text": "保存位置",
    "pageCover.solidBeige.title": "米色",
    "pageCover.solidBlue.title": "蓝色",
    "pageCover.solidRed.title": "红色",
    "pageCover.solidYellow.title": "黄色",
    "pageCover.webbTelescope.header": "詹姆斯·韦布空间望远镜",
    "pageCover.webbTelescopeCosmitCliffs": "船底座星云中的“宇宙悬崖”",
    "pageCover.webbTelescopeDeepField": "深空",
    "pageCover.webbTelescopeSouthernRingNebula": "南环星云",
    "pageCover.webbTelescopeStephansQuintet": "斯蒂芬五重星系",
    "pageCover.woodcuts1.subtitle": "1830，神奈川冲浪里",
    "pageCover.woodcuts1.title": "葛饰北斋",
    "pageCover.woodcuts10.subtitle": "1840，龟山",
    "pageCover.woodcuts10.title": "歌川广重",
    "pageCover.woodcuts11.subtitle": "1900，燕子和茶花",
    "pageCover.woodcuts11.title": "伊藤若冲",
    "pageCover.woodcuts13.subtitle": "1858，备前市由贺山",
    "pageCover.woodcuts13.title": "歌川广重",
    "pageCover.woodcuts14.subtitle": "1830，甲州犬目峠",
    "pageCover.woodcuts14.title": "葛饰北斋",
    "pageCover.woodcuts15.subtitle": "1842，草津站",
    "pageCover.woodcuts15.title": "歌川广重",
    "pageCover.woodcuts16.subtitle": "瀬田夕照",
    "pageCover.woodcuts16.title": "歌川广重",
    "pageCover.woodcuts2.subtitle": "1830，山下白雨",
    "pageCover.woodcuts2.title": "葛饰北斋",
    "pageCover.woodcuts3.subtitle": "1830，凯风快晴",
    "pageCover.woodcuts3.title": "葛饰北斋",
    "pageCover.woodcuts4.subtitle": "1842，锦鲤",
    "pageCover.woodcuts4.title": "溪斋英泉",
    "pageCover.woodcuts5.subtitle": "1878，江户郊外的冬夜街景",
    "pageCover.woodcuts5.title": "小林清亲",
    "pageCover.woodcuts6.subtitle": "1850，山景·臼井通的浅间",
    "pageCover.woodcuts6.title": "歌川国芳",
    "pageCover.woodcuts7.subtitle": "1833，京师·三条大桥",
    "pageCover.woodcuts7.title": "歌川广重",
    "pageCover.woodcuts8.subtitle": "1830，甲州三岛越",
    "pageCover.woodcuts8.title": "葛饰北斋",
    "pageCover.woodcuts9.subtitle": "1830，甲州石班泽",
    "pageCover.woodcuts9.title": "葛饰北斋",
    "pageCover.woodcutsSekka1.subtitle": "1909，巴之雪",
    "pageCover.woodcutsSekka1.title": "神坂雪佳",
    "pageCover.woodcutsSekka2.subtitle": "1903，熏香道具",
    "pageCover.woodcutsSekka2.title": "神坂雪佳",
    "pageCover.woodcutsSekka3.subtitle": "1909，春",
    "pageCover.woodcutsSekka3.title": "神坂雪佳",
    "pageDescription.emptyPlaceholder": "添加描述…",
    "pageDescription.lockedTooltip.message":
      "请解锁{pageTitleWithIcon}以编辑描述。",
    "pageErrorIndicator.loadingError.message":
      "哎呀，加载此页面时出错。请刷新以再次加载。",
    "pageErrorIndicator.reloadButton.label": "刷新",
    "pageLockIndicator.lockedButton.label": "已锁定",
    "pageLockIndicator.lockedTooltip":
      "由{lockedByPerson}{br}锁定，以防止意外编辑。{br}<prompttext>点击以解锁</prompttext>",
    "pageLockIndicator.mobileLockedButton.label": "已锁定",
    "pageLockIndicator.mobileRelockButton.label": "重新锁定",
    "pageLockIndicator.relockButton.label": "重新锁定",
    "pageMentionOverlay.openPage": "打开页面",
    "pageMoreButton.wordCount.caption": "字数：{count}",
    "pageOfflineIndicator.hasLocalData.message":
      "请连接网络后加载此页面，之后你便可以在离线时访问它。",
    "pageOfflineIndicator.noLocalData.message":
      "哎呀，你好像离线了。请连接网络后查看此页面。",
    "pageOnAppStoreSetting.description.message":
      "选择 Notion 启动或切换工作区时显示的内容。",
    "pageOnAppStoreSetting.firstPage.label": "侧边栏中的第一页",
    "pageOnAppStoreSetting.lastVisitedPage.label": "上次访问的页面",
    "pageOnAppStoreSetting.title": "启动时打开",
    "pagePermissionItem.allowComments.setting": "允许评论",
    "pagePermissionItem.allowComments.tooltip":
      "任何已登录的 Notion 用户都可以在此页面上发表评论。",
    "pagePermissionItem.allowDuplicateTemplate.setting": "允许创建副本",
    "pagePermissionItem.allowDuplicateTemplate.tooltip":
      "开启后，将允许其他用户创建公共页面的副本到他们的工作区。",
    "pagePermissionItem.allowEdits.setting": "允许编辑",
    "pagePermissionItem.allowEdits.tooltip":
      "任何已登录的 Notion 用户都可以编辑此页面。仅与你信任的人分享此秘密链接。",
    "pagePermissionItem.allowSearchEngine.tooltip":
      "如果允许，你的公共页面可能会出现在搜索引擎（如 Google）中，但仅当你或其他人在 Web 的其他地方链接到此网页时。",
    "pagePermissionItem.allowSearchEngines.setting": "搜索引擎索引",
    "pagePermissionItem.inheritedRecordPermissions.setting":
      "基于{linkBoxWithPageTitle}",
    "pagePermissionItem.searchEngineUpgradeTooltip.caption":
      "让你的页面出现在搜索引擎结果中。",
    "pagePermissionItem.searchEngineUpgradeTooltip.title":
      "升级以打开搜索引擎索引",
    "pagePermissionItem.showLinkOptions.label": "显示链接选项",
    "pageProperties.editProperty.customizePage.label": "自定义页面",
    "pagePropertyRowValue.addRelationButtonMessage": "添加页面",
    "pageShareMenu.copiedLinkButton.label": "✓ 已复制",
    "pageShareMenu.copyMaybePublicLinkButton.label.web": "复制网页链接",
    "pageShareMenu.copyPageLinkButton.label": "复制页面链接",
    "pageShareMenu.restrictedAccessBanner.label":
      "访问受限。可能无法与{linkBoxWithPageTitle}中的所有人分享。",
    "pageShareMenu.restrictedAccessBanner.restore": "恢复",
    "pageShareMenu.sharePageLinkButton.label": "分享页面链接",
    "pageSnapshotPreview.unknownPreviewLoadError.message": "出了些问题。",
    "pageTemplateModal.goToFullTemplateGalleryButton.label": "浏览更多模板",
    "pageTemplateModal.mobileModal.title": "试试这个模板",
    "pageTemplateModal.mobileModal.useButton.label": "使用",
    "pageTemplateModal.modifiedTemplateDialog.discardEditsButton.label": "放弃",
    "pageTemplateModal.modifiedTemplateDialog.prompt":
      "看起来你已经修改了模板。要保存编辑吗？",
    "pageTemplateModal.modifiedTemplateDialog.saveButton.label": "保存修改",
    "pageTemplateModal.useTemplateButton.label": "使用这个模板",
    "pageTemplatePreview.offline.message": "请连接网络后查看此模板。",
    "pageTitle.flaggedContent": "标记的内容",
    "pageUpdatesModal.mobileMenu.title": "页面更新",
    "pageViewBlock.add.pageComment": "添加评论",
    "pageViewBlock.add.pageCommentMobile": "评论",
    "pageViewBlock.add.pageCover": "添加封面",
    "pageViewBlock.add.pageCoverMobile": "封面",
    "pageViewBlock.add.pageIcon": "添加图标",
    "pageViewBlock.add.pageIconMobile": "图标",
    "pageViewBlock.add.pageTitle": "添加标题",
    "pageViewBlock.add.pageTitleMobile": "标题",
    "pageViewBlock.addDescription.button": "添加描述",
    "pageViewBlock.addDescription.mobileButton": "描述",
    "pageViewBlock.appContainer.header.collections.title":
      "{appName} 中的数据库",
    "pageViewBlock.appContainer.numberOfDatabases":
      "{numberOfDatabases} 个数据库",
    "pageViewBlock.archivedTeamBanner.message":
      "此页面位于已归档的团队空间中。",
    "pageViewBlock.editingPageBanner.status": "你现在可以编辑此页面。",
    "pageViewBlock.editingPageBanner.stop": "完成编辑",
    "pageViewBlock.evernoteBanner.contents":
      "已导入{totalNumberOfNotes}个笔记，共{totalNumberOfNotes}个",
    "pageViewBlock.hideDescription.button": "隐藏描述",
    "pageViewBlock.movedPageBanner.ancestorMovedMessage":
      "{movedAncestorLink} 已移动到 {targetSpaceLink}。",
    "pageViewBlock.movedPageBanner.pageMovedMessage":
      "已移动到 {targetSpaceLink}。",
    "pageViewBlock.permanentlyDeleted.message": "此页面已被永久删除。",
    "pageViewBlock.resolvedComments.menuTabTitle": "已解决的评论",
    "pageViewBlock.show.backlinks":
      "{numberOfBacklinks, plural, other {{numberOfBacklinks} 个反向链接}}",
    "pageViewBlock.show.backlinks.tooltip": "显示链接到此页面的页面",
    "pageViewBlock.show.pageComments":
      "{numberOfComments, plural, other {{numberOfComments} 则评论}}",
    "pageViewBlock.showDescription.button": "显示描述",
    "pageViewBlock.showDescription.mobileButton": "描述",
    "pageViewBlock.showResolvedComments.button":
      "{numberOfResolvedComments, plural, other {{numberOfResolvedComments} 条已解决的评论}}",
    "pageViewBlock.syncedBlock.original": "链接到原始 url",
    "pageViewBlock.templatePageBanner.backButton.label": "返回",
    "pageViewBlock.templatePageBanner.editTemplateLabel":
      "正在编辑{pageTitleWithIcon}<mediumtext>的模板</mediumtext>",
    "pageViewBlock.templatePageBanner.learnMoreLink": "了解更多",
    "pageViewBlock.templatePageBanner.mobile.editTemplateLabel":
      "{pageTitleWithIcon}<mediumtext>中的模板</mediumtext>",
    "pageViewBlock.trashBanner.deletePermanentlyButton.label": "永久删除",
    "pageViewBlock.trashBanner.message": "此页面位于垃圾箱中。",
    "pageViewBlock.trashBanner.restoreButton.label": "恢复页面",
    "pageViewBlock.trashBanner.restoreCurrentPageButton.label": "恢复当前页面",
    "pageViewBlock.trashBanner.restoreLastVersionButton.label":
      "恢复上一个版本",
    "passwordChangeNotificationEmail.changePassword.message":
      "可以使用你的新密码和邮箱地址 {emailAddress} 登录到 Notion",
    "passwordChangeNotificationEmail.newPasswordSet.headline":
      "你的 Notion 密码已设定完毕！",
    "passwordChangeNotificationEmail.newPasswordSet.subjectLine":
      "新密码已创建",
    "passwordChangeNotificationEmail.passwordChanged.headline":
      "你已更改 Notion 密码",
    "passwordChangeNotificationEmail.passwordChanged.subjectLine":
      "你的密码已被更改",
    "passwordChangeNotificationEmail.passwordRemoved.headline":
      "你的 Notion 密码已被删除",
    "passwordChangeNotificationEmail.passwordRemoved.subjectLine":
      "你的密码已被移除",
    "passwordChangeNotificationEmail.removePassword.message":
      "你仍然可以通过登录页面上的“用电子邮件登录”来访问 Notion。我们会通过电子邮件向你传送一个临时登录码。",
    "passwordChangeNotificationEmail.setPassword.message":
      "现在你可以使用你的邮箱地址 {emailAddress} 和新密码来访问工作区。",
    "passwordChangeNotificationEmail.unintendedChange.message":
      "如果你没有进行此更改，请发送电子邮件到 team@makenotion.com 告知我们。去“我的帐户”设置中更改密码，或使用“忘记密码”重设密码。",
    "passwordResetEmail.clickToResetPassword.message": "点这里重置密码",
    "passwordResetEmail.emailSubject": "重置你的密码",
    "passwordResetEmail.emailText.message":
      "通过访问以下链接重置密码： {resetUrl}",
    "passwordResetEmail.emailTitle": "重置你的 Notion 密码",
    "passwordResetEmail.noResetRequested.message":
      "如果你没有请求重置，请不要担心。你可以安全地忽略此电子邮件。",
    "passwordSettings.changePasswordButton.label": "更改密码",
    "passwordSettings.changePasswordModal.newPasswordMismatchError":
      "你的新密码不匹配。",
    "passwordSettings.changePasswordModal.newPasswordNotRepeatedError":
      "请重复你的新密码。",
    "passwordSettings.changePasswordModal.newPasswordsMismatchError":
      "你的密码不匹配。",
    "passwordSettings.changePasswordModal.oldPasswordInput.label": "旧密码",
    "passwordSettings.changePasswordModal.oldPasswordMissingError":
      "请输入你的旧密码。",
    "passwordSettings.changePasswordModal.passwordNotEnteredError":
      "请输入密码。",
    "passwordSettings.changePasswordSuccess.message": "你的新密码已保存。",
    "passwordSettings.deletePasswordModal.passwordInput.label": "密码",
    "passwordSettings.educationPlanGuidelines":
      "如果你无法访问学校的邮箱地址，则可以使用密码登录。",
    "passwordSettings.genericPasswordSaveError": "保存密码时出错。请稍后再试。",
    "passwordSettings.newPasswordInput.label": "新密码",
    "passwordSettings.newPasswordInput.placeholder": "输入新密码…",
    "passwordSettings.oldPasswordInput.placeholder": "输入旧密码…",
    "passwordSettings.passwordGuidelines":
      "密码长度至少为 15 个字母，或者长度至少为 8 个字符且同时包含字母和数字。",
    "passwordSettings.passwordInput.label": "密码",
    "passwordSettings.passwordManagedThroughSAMLProvider.message":
      "你的密码是由你的 SAML 单点登录供应商管理的。",
    "passwordSettings.passwordMissingLetter.message":
      "请在密码中包含字母，或使用更长的密码。",
    "passwordSettings.passwordMissingLetterAndNumber.message":
      "请在密码中包含字母和数字，或使用更长的密码。",
    "passwordSettings.passwordMissingNumber.message":
      "请在密码中包含数字，或使用更长的密码。",
    "passwordSettings.passwordNotEntered.message": "请输入你的密码。",
    "passwordSettings.passwordNotSet.message": "未设置密码。",
    "passwordSettings.passwordSetError.message":
      "你目前无法设置密码。请稍后再试。",
    "passwordSettings.passwordSetInstructions":
      "如果你不想使用临时登录码，你可以设置永久密码。",
    "passwordSettings.passwordTooConsistent.message": "请添加其他唯一字符。",
    "passwordSettings.passwordTooShortError.message": "请增加密码长度。",
    "passwordSettings.removePasswordButton.label": "移除密码",
    "passwordSettings.removePasswordModal.educationPlanWarning":
      "如果你无法访问学校的邮箱地址，则将无法重新登录 Notion。",
    "passwordSettings.removePasswordModal.message":
      "移除密码时出错。请稍后再试。",
    "passwordSettings.removePasswordModal.oldPasswordNotEnteredError":
      "请输入你的当前密码。",
    "passwordSettings.removePasswordModal.passwordInput.placeholder":
      "输入密码…",
    "passwordSettings.removePasswordModal.removePasswordButton.label":
      "移除密码",
    "passwordSettings.removePasswordModal.text":
      "你即将删除密码。我们会通过电子邮件将你的临时登录码发送给你，以供日后访问 Notion。",
    "passwordSettings.removePasswordSuccess.message": "你的密码已被移除。",
    "passwordSettings.repeatPasswordInput.label": "再次输入密码",
    "passwordSettings.repeatPasswordInput.placeholder": "再次输入新密码…",
    "passwordSettings.setPasswordButton.label": "设置密码",
    "passwordSettings.setPasswordSuccess.educationMessage":
      "你的密码已全部设置好！即使无法访问学校的邮箱地址，你也能用密码登录。",
    "passwordSettings.setPasswordSuccess.message": "密码设置完毕！",
    "passwordSettings.title": "密码",
    "pdfBlock.embeds.button.label": "嵌入 PDF",
    "pdfBlock.embeds.caption": "嵌入 PDF 文件",
    "pdfBlock.placeholder": "嵌入 PDF",
    "peekModeIntroTooltip.subtitle":
      "使用表格、看板、列表和时间轴，同时在侧边打开页面，以加快工作流程。在此处切换到其他预览模式。",
    "peekModeIntroTooltip.title": "新增功能！在侧边预览中打开页面",
    "peekMoveToMenu.addTo.addTo": "添加到",
    "peekMoveToMenu.addTo.defaultButton": "添加到",
    "peekMoveToMenu.addTo.privatePages": "私人页面",
    "peekMoveToMenu.tooptip": "设置默认页面或数据库",
    "peekTopbar.changePeekOption.changeForThisView": "编辑视图默认设置",
    "peekTopbar.close.button": "关闭",
    "peekTopbar.navigateToPage.tooltip": "以整页形式打开",
    "peekTopbar.openPagesAs.button": "切换预览模式",
    "peekTopbar.openPagesAs.buttonFullPage": "或以整页形式打开",
    "peekTopbar.peekNavDownArrow.tooltip": "下一页",
    "peekTopbar.peekNavUpArrow.tooltip": "上一页",
    "permissionInviteToken.groupRole.ownerAlert.tooltip":
      "不能将群组添加为团队空间所有者。",
    "permissionItem.publicPermissionItem.expiration.day": "一天内",
    "permissionItem.publicPermissionItem.expiration.hour": "一小时内",
    "permissionItem.publicPermissionItem.expiration.week": "一周内",
    "permissionRoleSelect.overrideMessage.caption":
      "更改角色后，将替代从父页面继承的权限。",
    "permissionRoleSelect.spaceReadAndWriteUpgradeTooltip.caption":
      "成员无法更改工作区设置或邀请新成员。",
    "permissionRoleSelect.spaceReadAndWriteUpgradeTooltip.title":
      "升级以添加非管理员成员",
    "permissionRoleSelect.userEditorUpgradeTooltip.caption":
      "具有全部权限的访客可以编辑页面并与他人分享。",
    "permissionRoleSelect.userEditorUpgradeTooltip.title": "升级以授予全部权限",
    "permissionRoleSelect.userReadAndWriteUpgradeTooltip.caption":
      "具有编辑权限的用户可以编辑页面，但不能与他人分享页面。",
    "permissionRoleSelect.userReadAndWriteUpgradeTooltip.title":
      "升级以添加编辑者",
    "permissions.confirmDialog.upgradeToTeamWorkspace.confirmButton.label":
      "升级到团队工作区",
    "permissions.confirmDialog.upgradeToTeamWorkspace.message":
      "若要将成员添加到工作区，你需要切换到团队版。将根据当前的计费间隔和账户余额按比例向你收取费用。",
    "permissionsActions.preventRemovingAllFullAccess.message":
      "在删除此权限之前，请向其他人授予“全部权限”。",
    "permissionsActions.preventUserOrGroupDeletion.message":
      "至少有一个人或一个组必须具有访问权限。",
    "permissionsInvite.closeInviteDialog.cancelButton.label": "取消",
    "permissionsInvite.closeInviteDialog.confirmationButton.label": "是",
    "permissionsInvite.closeInviteDialog.confirmationMessage":
      "你的更改尚未保存。放弃更改？",
    "permissionsInvite.integration.select.message": "选择集成",
    "permissionsInvite.searchInput.placeholder": "搜索邮箱地址、姓名或群组",
    "permissionsInvite.spaceAddMemberUpgradeTooltip.caption":
      "成员是你邀请加入到工作区的队友。他们可以访问并添加页面供所有成员查看，或者被邀请到具有私人协作权限的页面。",
    "permissionsInvite.spaceAddMemberUpgradeTooltip.title": "升级以添加成员",
    "pricingGrid.betaBadge": "测试版",
    "pricingGrid.businessPlanColumn.header": "商业版",
    "pricingGrid.cancelPlanLink": "取消方案",
    "pricingGrid.comingSoonBadge": "即将推出",
    "pricingGrid.comparisonSection.adminAndSecurityFeatures.title":
      "管理员与安全性",
    "pricingGrid.comparisonSection.adminAndSecurityFeatures.titleMessage":
      "安全与管理",
    "pricingGrid.comparisonSection.collaboration.title": "协作",
    "pricingGrid.comparisonSection.features.title": "功能",
    "pricingGrid.comparisonSection.general.title": "一般",
    "pricingGrid.comparisonSection.notionFundamentals.title": "Notion 基础",
    "pricingGrid.comparisonSection.platformAndWorkflow.title": "平台/工作流程",
    "pricingGrid.comparisonSection.support.title": "支持",
    "pricingGrid.comparisonSection.support.titleMessage": "支持与访问权限",
    "pricingGrid.comparisonSection.usage.title": "使用",
    "pricingGrid.contactSalesLink": "联系销售人员",
    "pricingGrid.currentPlan.largeScreenLabel": "当前方案",
    "pricingGrid.currentPlan.tooltip": "这是你当前的方案",
    "pricingGrid.currentPlanButton.label": "当前方案",
    "pricingGrid.downgradePlanButton.label": "降级",
    "pricingGrid.enterprisePlanColumn.header": "企业版",
    "pricingGrid.inTeamTrial": "免费试用中",
    "pricingGrid.inTeamTrial.tooltip":
      "你当前的团队试用版有 1,000 个块限制。升级以解除限制。",
    "pricingGrid.personalFreePlanColumn.header": "个人版",
    "pricingGrid.personalPlans.label": "个人使用",
    "pricingGrid.personalProPlanColumn.header": "个人专业版",
    "pricingGrid.planAttribute.ApiAdminControls.title": "API 管理控件",
    "pricingGrid.planAttribute.LinkPreviews.titleMessage": "链接预览",
    "pricingGrid.planAttribute.SSO.tooltip":
      "通过安全的单点登录，自动化管理员工的访问权限。",
    "pricingGrid.planAttribute.adminTools.title": "管理员工具",
    "pricingGrid.planAttribute.adminTools.tooltip":
      "创建独立的管理员角色，以与成员权限区分。只有管理员可以邀请新成员、更改工作区设置。",
    "pricingGrid.planAttribute.advancedPermissions.title": "高级权限",
    "pricingGrid.planAttribute.advancedPermissions.tooltip":
      "设置更精细的权限，以限制受邀人员与他人分享页面。",
    "pricingGrid.planAttribute.advancedSecurity.title": "高级安全控制",
    "pricingGrid.planAttribute.advancedSecurity.tooltip":
      "解锁额外的权限控制，以防止特定人员向外部分享页面、禁用访客、并设置工作区级别规则。",
    "pricingGrid.planAttribute.allPersonalPlanFeatures.tooltip":
      "含个人版的所有功能，以及更多。",
    "pricingGrid.planAttribute.allProPlanFeatures.tooltip":
      "含个人专业版的所有功能，以及更多。",
    "pricingGrid.planAttribute.allTeamPlanFeatures.tooltip":
      "含团队版的所有功能，以及更多。",
    "pricingGrid.planAttribute.apiAdminControls.description.advanced": "高级",
    "pricingGrid.planAttribute.apiAdminControls.description.basic": "基本",
    "pricingGrid.planAttribute.apiAdminControls.tooltip":
      "为管理员提供对 API 的更多控制。",
    "pricingGrid.planAttribute.apps.title": "Web、桌面和移动应用",
    "pricingGrid.planAttribute.apps.tooltip":
      "Notion 可以在任何网页浏览器中运行，无需安装。你也可以下载我们的 Mac、Windows、iOS 或安卓应用。",
    "pricingGrid.planAttribute.auditLog.title": "审计日志",
    "pricingGrid.planAttribute.auditLog.tooltip":
      "访问工作区帐户的安全和安全相关活动的详细日志，以识别潜在的安全问题、调查可疑行为或排查访问问题。",
    "pricingGrid.planAttribute.blockStorage.tooltip":
      "块是你添加到页面上的内容组成部分，例如段落、待办事项、图片、嵌入式文件等。现在，所有定价方案的块都是无限的。团队试用版中的块存储上限为 1,000 个。",
    "pricingGrid.planAttribute.blockTypes.title": "40 多种块内容类型",
    "pricingGrid.planAttribute.blockTypes.tooltip.line1":
      "块是你可以添加到页面的不同类型的内容：待办事项、图像、代码块、上传的文件。",
    "pricingGrid.planAttribute.blockTypes.tooltip.line2":
      "块还可以帮助你嵌入来自 Google Drive、GitHub、Twitter 和 Typeform 等第三方服务的内容。",
    "pricingGrid.planAttribute.blocks.title": "页面和块",
    "pricingGrid.planAttribute.blocks.titleMessage": "块",
    "pricingGrid.planAttribute.bulkExport.title": "批量导出",
    "pricingGrid.planAttribute.bulkExport.tooltip":
      "你的数据是你的。你可以将所有页面导出为 HTML、Markdown 或 CSV（用于数据库），以及你上传的任何文件/图片。",
    "pricingGrid.planAttribute.bulkPDFExport.title": "批量 PDF 导出",
    "pricingGrid.planAttribute.bulkPDFExport.tooltip":
      "将所有内容导出为 PDF，方便进行法律或合规性备份。",
    "pricingGrid.planAttribute.button.upgrade": "升级",
    "pricingGrid.planAttribute.collaborativeWorkspace.title": "协作工作区",
    "pricingGrid.planAttribute.collaborativeWorkspace.tooltip":
      "协作工作区让成员轻松分享页面给整个团队，让整个团队统一内容结构，并支持精细的权限设置。",
    "pricingGrid.planAttribute.contentApi.title.v2": "API",
    "pricingGrid.planAttribute.contentApi.title.v3": "API 调用",
    "pricingGrid.planAttribute.contentApi.tooltip.v2":
      "<p>使用 Notion API 为你的团队构建自定义集成。现在处于测试阶段。</p>",
    "pricingGrid.planAttribute.contentApi.tooltip.v3":
      "使用 Notion API 为你的团队构建自定义集成。",
    "pricingGrid.planAttribute.customContract.title": "定制合同和账单",
    "pricingGrid.planAttribute.customContract.tooltip":
      "我们将为你定制合同，并通过 PO/账单付款。适用于超过 100 个用户的企业帐户。",
    "pricingGrid.planAttribute.databaseProperties.tooltip":
      "构建具有丰富属性的强大数据库，例如复选框、下拉菜单、货币、指派人员、日期和文件等。",
    "pricingGrid.planAttribute.databaseSync.title": "同步数据库",
    "pricingGrid.planAttribute.databaseViews.title":
      "表格、列表、日历、看板、画廊和时间轴视图",
    "pricingGrid.planAttribute.databases.title": "具有多元属性类型的数据库",
    "pricingGrid.planAttribute.databases.tooltip":
      "数据库支持多种视图，可以选择最适合自己工作流的可视化方式。数据库可以用来做项目看版、事件日历等。",
    "pricingGrid.planAttribute.dedicatedManager.title":
      "专属客户成功经理{break}（超过 100 个席位）",
    "pricingGrid.planAttribute.dedicatedManager.tooltip":
      "适用于超过 100 人的年付团队。",
    "pricingGrid.planAttribute.dedicatedManager.value.scaledSuccess":
      "扩展成功",
    "pricingGrid.planAttribute.earlyAccess.title": "提前使用新功能",
    "pricingGrid.planAttribute.earlyAccess.tooltip":
      "提前体验特权意味着你将永远拥有最新、功能最强大的 Notion 版本。你还将直接影响我们未来的产品路线图。",
    "pricingGrid.planAttribute.evernoteHierarchy.tooltip":
      "将笔记组织到笔记本或堆叠中。",
    "pricingGrid.planAttribute.fileUploads.title": "文件上传",
    "pricingGrid.planAttribute.fileUploads.tooltip":
      "单一文件大小限制可能适用于你上传到 Notion 页面或数据库的任何文件。",
    "pricingGrid.planAttribute.fileUploads.trial.5MbFileUploadLimit":
      "试用版 5 MB",
    "pricingGrid.planAttribute.fileUploads.value.5MbFileUploadLimit": "5 MB",
    "pricingGrid.planAttribute.freeForIndividuals.tooltip":
      "现在，个人可免费使用 Notion。",
    "pricingGrid.planAttribute.genericNotes.tooltip":
      "创建文档，并与他人分享。",
    "pricingGrid.planAttribute.genericReminders.tooltip":
      "收到截止日期的提醒。",
    "pricingGrid.planAttribute.genericTags.tooltip": "组织并追踪你的笔记。",
    "pricingGrid.planAttribute.genericWebClipper.tooltip":
      "保存网络上的任何页面。",
    "pricingGrid.planAttribute.guests.title": "访客",
    "pricingGrid.planAttribute.guests.titleMessage": "访客访问权限",
    "pricingGrid.planAttribute.guests.tooltip":
      "访客是工作区成员之外的个人，例如朋友、家人、承包商或客户。通过在个人页面上邀请访客进行非公开协作。",
    "pricingGrid.planAttribute.limitedVersionHistory.tooltip":
      "查看和恢复过去 30 天内任何 Notion 页面的以前版本。",
    "pricingGrid.planAttribute.linkPreviews.title": "预览链接",
    "pricingGrid.planAttribute.linkPreviews.tooltip":
      "链接预览会在你粘贴链接时显示网页的预览。",
    "pricingGrid.planAttribute.linkSharing.title": "链接共享",
    "pricingGrid.planAttribute.linkSharing.tooltip":
      "与任何人分享一个秘密链接，以便他们查看、评论或编辑你的页面。",
    "pricingGrid.planAttribute.members.title": "成员",
    "pricingGrid.planAttribute.members.titleMessage": "成员限制",
    "pricingGrid.planAttribute.members.tooltip":
      "成员是你邀请加入工作区的队友。他们可以访问并添加页面供所有成员查看，或者被添加到具有私人协作权限的页面。",
    "pricingGrid.planAttribute.membershipAdmin.title": "成员资格管理员",
    "pricingGrid.planAttribute.membershipAdmin.tooltip":
      "成员资格管理员可以在工作区和组中添加和删除成员，但无权访问其他工作区设置。",
    "pricingGrid.planAttribute.notInTrial": "不在试用版中",
    "pricingGrid.planAttribute.notionCollaboration.tooltip":
      "与其他人同时在同一个页面上工作。",
    "pricingGrid.planAttribute.notionDatabases.tooltip":
      "用数据库视图、汇总、筛选器等工具搭建新的工作流。",
    "pricingGrid.planAttribute.notionHierarchy.tooltip":
      "笔记可以无限层级、无限嵌套。",
    "pricingGrid.planAttribute.notionMarkdown.tooltip":
      "用 Markdown 书写或导出内容。",
    "pricingGrid.planAttribute.permissionGroups.title": "权限群组",
    "pricingGrid.planAttribute.permissionGroups.tooltip":
      "为不同的群组和团队设置不同等级及精细度的权限。",
    "pricingGrid.planAttribute.prioritySupport.title": "优先支持",
    "pricingGrid.planAttribute.prioritySupport.titleMessage": "高级支持",
    "pricingGrid.planAttribute.prioritySupport.tooltip":
      "我们随时为你提供帮助。",
    "pricingGrid.planAttribute.proWebPublishing.tooltip":
      "将 Notion 页面作为独立网站发布。即将推出。",
    "pricingGrid.planAttribute.realTimeCollaboration.title": "实时协作",
    "pricingGrid.planAttribute.realTimeCollaboration.tooltip":
      "实时与他人合作，可显示在线状态和评论。",
    "pricingGrid.planAttribute.scimApi.title": "用户管理分配（SCIM）",
    "pricingGrid.planAttribute.scimApi.tooltip":
      "访问 Notion SCIM API 以配置和管理用户和群组。",
    "pricingGrid.planAttribute.sharingPermissions.tooltip":
      "设置更精细的权限，以限制受邀人员与他人分享页面。",
    "pricingGrid.planAttribute.sso.title": "SAML 和单点登录（SSO）",
    "pricingGrid.planAttribute.syncedDatabases.tooltip":
      "将Jira和GitHub的最新信息从Notion展示到数据库。",
    "pricingGrid.planAttribute.teams.title": "团队空间",
    "pricingGrid.planAttribute.teams.tooltip":
      "让你可以在不同的团队（如营销、工程或设计）中创建和组织所有文档。",
    "pricingGrid.planAttribute.teams.value.limitedTeams": "3 个团队空间",
    "pricingGrid.planAttribute.teams.value.noTeams": "无团队空间",
    "pricingGrid.planAttribute.teams.value.unlimited": "无限的团队空间",
    "pricingGrid.planAttribute.templates.title": "50 多个入门模板",
    "pricingGrid.planAttribute.templates.tooltip.line1":
      "你可以从一张白纸开始，也可以直接从经过专业设计的模板库中挑选模板。",
    "pricingGrid.planAttribute.templates.tooltip.line2":
      "一些模板包括：笔记、目标、公司主页、会议记录、产品路线图、员工入职手册和工程知识库。",
    "pricingGrid.planAttribute.timeline.tooltip":
      "使用时间轴视图进行项目排程和规划。",
    "pricingGrid.planAttribute.unlimitedVersionHistory.tooltip":
      "查看和恢复任何 Notion 页面的以前版本。",
    "pricingGrid.planAttribute.value.blockLimit": "试用版 1,000 个",
    "pricingGrid.planAttribute.value.justYou": "仅自己",
    "pricingGrid.planAttribute.value.unlimitedMembers": "无限",
    "pricingGrid.planAttribute.versionHistory.title": "版本历史",
    "pricingGrid.planAttribute.versionHistory.tooltip":
      "查看和恢复任何 Notion 页面的以前版本。",
    "pricingGrid.planAttribute.versionHistory.value.1WeekSavedHistory": "1 周",
    "pricingGrid.planAttribute.versionHistory.value.30DaysSavedHistory":
      "30 天",
    "pricingGrid.planAttribute.versionHistory.value.foreverSavedHistory":
      "永久",
    "pricingGrid.planAttribute.versionHistory.value.notInTrial": "不在试用版中",
    "pricingGrid.planAttribute.versionHistory.value.oneYearSavedHistory":
      "1 年",
    "pricingGrid.planAttribute.versionHistory.value.trialUpgradeLabel":
      "升级到 30 天历史记录",
    "pricingGrid.planAttribute.wikiDocsNotes.title": "知识库、文档和笔记",
    "pricingGrid.planAttribute.wikisDocsNotes.tooltip":
      "用 Notion 构建共享知识库、文档，或将其作为强大的笔记工具。",
    "pricingGrid.pricingTermToggle.payAnnually.label": "年付",
    "pricingGrid.pricingTermToggle.payMonthly.label": "月付",
    "pricingGrid.resubscribePlanButton.label": "重新订阅",
    "pricingGrid.switchPlanAsMember.tooltip":
      "需要成为此工作区的管理员才能切换方案。",
    "pricingGrid.switchPlanFromInAppPurchase.tooltip":
      "你目前通过 Apple 的应用内购买进行订阅。要切换计划，请先取消你的 Apple 订阅。",
    "pricingGrid.switchToPersonalPlanButton.tooltip":
      "个人版和个人专业版仅供 1 人使用。如果你想使用这些方案，请移除当前工作区中的其他成员。",
    "pricingGrid.teamPlanColumn.header": "团队版",
    "pricingGrid.teamPlans.label": "团队或企业",
    "pricingGrid.teamTrialLink": "免费试用",
    "pricingGrid.upgradePlanButton.label": "升级",
    "pricingGrid.willDowngradePlan.largeScreenLabel": "未来方案",
    "pricingGrid.willDowngradePlan.tooltip": "这是你当前方案到期后的方案",
    "pricingGrid.willDowngradePlanButton.label": "未来方案",
    "pricingHelpers.perMemberPerMonthPricing.label": "每人每月",
    "pricingHelpers.perMonthPricing.label": "每月",
    "privatePageBadge.label": "私人",
    "privatePageBadge.tooltip": "只有你可以访问此页面",
    "profileSettings.cancelButton.label": "取消",
    "profileSettings.changeEmailModal.changeEmailButton.label": "更改邮箱地址",
    "profileSettings.changeEmailModal.continueButton.label": "继续",
    "profileSettings.changeEmailModal.currentEmail":
      "你当前的邮箱地址是 {currentEmail}。",
    "profileSettings.changeEmailModal.enterCurrentEmailVerificationCodeInput.placeholder":
      "输入登录码",
    "profileSettings.changeEmailModal.enterPasswordInstructions":
      "请输入你的密码。",
    "profileSettings.changeEmailModal.enterVerificationCodeInput.placeholder":
      "输入验证码",
    "profileSettings.changeEmailModal.errorFetchingAccountData":
      "无法获取 {currentEmail} 的帐户信息。",
    "profileSettings.changeEmailModal.errorNoUserValue": "未定义用户值。",
    "profileSettings.changeEmailModal.newEmailInput.placeholder":
      "输入新的电子邮件地址",
    "profileSettings.changeEmailModal.newEmailInstructions":
      "请输入新的邮箱地址，我们将向你发送验证码。",
    "profileSettings.changeEmailModal.passwordInput.label": "密码",
    "profileSettings.changeEmailModal.sendCurrentEmailVerificationCode.label":
      "发送验证码",
    "profileSettings.changeEmailModal.sendVerificationCodeButton.label":
      "发送验证码",
    "profileSettings.changeEmailModal.sendVerificationCodeToCurrentEmail":
      "我们将向此邮箱地址发送临时验证码。",
    "profileSettings.changeEmailModal.sentVerificationCodeToCurrentEmail":
      "我们已向此邮箱地址发送了临时验证码。",
    "profileSettings.changeEmailModal.verificationCodeSentMessage":
      "我们刚刚向你的帐户 {newEmail} 发送了一个临时验证码 。",
    "profileSettings.cookieAcceptance.subtitle":
      "允许 Notion 使用 cookie 来改善你的体验。",
    "profileSettings.cookieAcceptance.title": "接受 cookie",
    "profileSettings.dangerousSettings.deleteAccountButton.label":
      "删除我的帐户",
    "profileSettings.dangerousSettings.title": "危险区域",
    "profileSettings.deleteAccountConfirmationDialog.deleteAccountAndWorkspacesButton.label":
      "{numberOfWorkspaces, plural, other {永久删除帐户以及 {numberOfWorkspaces} 个工作区}}",
    "profileSettings.deleteAccountConfirmationDialog.deleteAccountAndWorkspacesButtonMobile.label":
      "{numberOfWorkspaces, plural, other {删除帐户和 {numberOfWorkspaces} 个工作区}}",
    "profileSettings.deleteAccountConfirmationDialog.deleteAccountButton.label":
      "永久删除帐户",
    "profileSettings.deleteAccountConfirmationDialog.prompt":
      "请输入你的邮箱地址进行确认。",
    "profileSettings.deleteAccountConfirmationDialog.warning":
      "此操作无法撤消。这将永久删除你的整个帐户。所有私人工作区将被删除，同时你将从所有共享工作区中移除。",
    "profileSettings.helpButton.caption":
      "帐户设定的更改将应用于你的所有工作区。",
    "profileSettings.helpButton.learnMoreLink": "<s>了解更多。</s>",
    "profileSettings.offline.message": "请连接网络后设置个人资料。",
    "profileSettings.personalInfoSection.emailSetting.changeEmailButton.label":
      "更改邮箱地址",
    "profileSettings.personalInfoSection.emailSetting.label": "电子邮件地址",
    "profileSettings.personalInfoSection.nameInput.label": "首选名称",
    "profileSettings.personalInfoSection.nameMissing.message": "请填写姓名。",
    "profileSettings.personalInfoSection.title": "个人资料",
    "profileSettings.profilePhotoSection.removePhotoButton.label": "移除",
    "profileSettings.profilePhotoSection.title": "照片",
    "profileSettings.profilePhotoSection.uploadPhotoButton.label": "上传照片",
    "profileSettings.profilePhotoSection.uploadProfilePhotoError.message":
      "上传失败。",
    "profileSettings.title": "帐户",
    "profileSettings.updateButton.label": "更新",
    "propertySelectMenu.mobileMenu.property.header": "属性",
    "propertySelectMenu.mobileMenu.relationProperty.header": "关联属性",
    "propertySelectMenu.search.noResults.title": "无结果",
    "propertySelectMenu.searchForProperty.default.placeholder": "搜索属性…",
    "propertySelectMenu.searchForProperty.relation.placeholder":
      "搜索关联属性…",
    "publicPageDataHelpers.untitledWorkspace.placeholder": "无标题的工作区",
    "publicPermissionItem.expiration.chooseDate": "选择日期",
    "publicPermissionItem.expiration.never": "从不",
    "publicPermissionItem.expirationTime.label": "链接过期",
    "publicPermissionsMenu.expiration.mobile.label": "完成",
    "publicPermissionsMenu.expiration.mobile.title": "到期时间",
    "pushNotification.authorPhrase.unknown": "未知作者",
    "pushNotification.blockEdited.notificationSubject":
      "{userName} 编辑了 {blockName}",
    "pushNotification.deletedBlock.notificationContents":
      "[已删除] {renderedBlock}",
    "pushNotification.emptyBlockPropertyValueEdited.placeholderLabel": "空",
    "pushNotification.imageInPushNotification.placeholder": "{imageEmoji} 图片",
    "pushNotification.pageName.defaultLabel": "Notion 页面",
    "pushNotification.permissionGroupName.defaultLabel": "已删除的群组",
    "pushNotification.permissionGroupName.untitledLabel": "无标题群组",
    "pushNotification.pluralizedUserNames.defaultLabel": "有人",
    "pushNotification.propertyNameWithEditedValue.notificationBody":
      "{propertyName} ({propertyValue})",
    "pushNotification.propertyNameWithEditedValue.notificationSubject":
      "{propertyName} ({propertyValue})",
    "pushNotification.threePlusUserNames.label":
      "{othersCount, plural, other {{firstAuthor}及其他 {othersCount} 位}}",
    "pushNotification.twoUserNames.label": "{firstAuthor} 和 {secondAuthor}",
    "pushNotification.untitledBlockTitle.placeholder": "无标题",
    "pushNotification.untitledCollectionName.placeholder": "无标题",
    "pushNotification.untitledSpaceName.label": "无标题",
    "pushNotification.untitledTeamName.label": "无标题",
    "pushNotification.userCreatedBlockInSpace.message":
      "{userName} 在 {spaceName} 创建了 {targetName}",
    "pushNotification.userCreatedRowInCollection.message":
      "{userName} 在 {collectionName} 创建了 {targetName}",
    "pushNotification.userCreatedTarget.label":
      "{userName} 创建了 {permissionGroupName}",
    "pushNotification.userDeletedBlockInSpace.message":
      "{userName} 删除了 {spaceName} 中的 {targetName}",
    "pushNotification.userDeletedRowInCollection.message":
      "{userName} 删除了 {collectionName} 中的 {targetName}",
    "pushNotification.userDeletedTarget.label":
      "{userName} 删除了 {permissionGroupName}",
    "pushNotification.userEditedTarget.label":
      "{userName}编辑了{permissionGroupName}",
    "pushNotifications.accessRequested.subject": "{userName}请求访问{pageName}",
    "pushNotifications.botPermissionsWithRole.label":
      "{botName} ({permissionLevel})",
    "pushNotifications.collectionCreated.notificationSubject":
      "{userName} 创建了 {collectionName}",
    "pushNotifications.collectionDescriptionAdded.notificationSubject":
      "{userName} 为 {collectionName} 添加了描述",
    "pushNotifications.collectionDescriptionDeleted.notificationSubject":
      "{userName} 删除了 {collectionName} 的描述",
    "pushNotifications.collectionEdited.notificationSubject":
      "{userName} 编辑了 {collectionName}",
    "pushNotifications.collectionPropertyEdited.subject":
      "{userName}编辑了{collectionName}中的{propertyType}属性",
    "pushNotifications.collectionViewEdited.notificationSubject":
      "{userName}编辑了{collectionName}中的{collectionViewName}视图",
    "pushNotifications.commentOnlyPermissionLevel.label": "只能评论",
    "pushNotifications.editOnlyPermissionLevel.label": "只能编辑",
    "pushNotifications.editPermissionLevel.label": "编辑",
    "pushNotifications.editorPermissionLevel.label": "全部权限",
    "pushNotifications.emailAccountSettingsEdited.subject":
      "{userName}编辑了其帐户设置",
    "pushNotifications.emptyPropertyValueInCollection.label": "空",
    "pushNotifications.formatChange.pageIcon.imagePlaceholder": "图片",
    "pushNotifications.formatChange.pageIcon.label": "页面图标",
    "pushNotifications.noAccessPermissionLevel.label": "无法访问",
    "pushNotifications.pageDeleted.subject": "{userName} 已删除 {pageName}",
    "pushNotifications.pageLocked.subject": "{userName} 锁定了 {pageName}",
    "pushNotifications.pagePermanentlyDeleted.subject":
      "{userName} 已永久删除 {pageName}",
    "pushNotifications.pageRestored.subject": "{userName} 已恢复 {pageName}",
    "pushNotifications.pageUnlocked.subject": "{userName} 解锁了 {pageName}",
    "pushNotifications.permissionsEditedForPageOrSpace.notificationSubject":
      "{userName}编辑了{targetName}的权限",
    "pushNotifications.publicPermissions.label": "公开 ({permissionLevel})",
    "pushNotifications.readerPermissionLevel.label": "只读",
    "pushNotifications.reminderChanged.subject": "{pageName} 中的提醒",
    "pushNotifications.spacePermissionsWithRole.label":
      "{spaceName} ({permissionLevel})",
    "pushNotifications.unknownAuthorUpdatedProperty.label": "未知作者",
    "pushNotifications.unknownCollectionPropertyName.label": "未知",
    "pushNotifications.unknownRelationPropertyChanged.label": "未知",
    "pushNotifications.untitledCollection.label": "无标题",
    "pushNotifications.userAddedToSpace.notificationSubject":
      "{userName} 将你加入到 {workspaceName}",
    "pushNotifications.userCommentedSubject.notificationSubject":
      "{userName} 在 {targetName} 发表了评论",
    "pushNotifications.userDeletedCommentText.notificationContents":
      "[已删除]💬 {commentText}",
    "pushNotifications.userInvitedToSpace.notificationSubject":
      "{userName} 邀请你加入 {workspaceName}",
    "pushNotifications.userInvitedToSpaceByBot.notificationSubject":
      "你已被邀请加入{workspaceName}",
    "pushNotifications.userInvitedToTeam.notificationSubject":
      "{userName} 邀请你加入 {teamName} 团队",
    "pushNotifications.userMentionedInPage.notificationSubject":
      "{userName}在{targetName}提及了你",
    "pushNotifications.userPermissionsWithRole.label":
      "{userName} ({permissionLevel})",
    "pushNotifications.workspaceName.untitled.placeholder": "无标题",
    "queueApiErrors.duplicateBlockLimit.errorMessage":
      "糟糕，内容太多了！你当前的方案限制你只能创建 {blockLimitNumber} 个块副本。请使用较少的内容重试。",
    "queueApiErrors.export_audit_log_limit.errorMessage":
      "哎呀，此工作区的导出操作已在进行中！请在当前导出完成并收到包含 CSV 内容的电子邮件后重试。",
    "quoteBlock.emptyQuote.placeholder": "空白引用",
    "rateLimitError.message": "请稍后再试。",
    "recordIcon.customTab.title": "自定义",
    "recordIcon.emojiModalMenu.title": "页面图标",
    "recordIcon.emojiTab.title": "表情符号",
    "recordIcon.iconTab.title": "图标",
    "recordIcon.linkTab.buttonText": "提交",
    "recordIcon.linkTab.placeholder": "粘贴图片链接…",
    "recordIcon.mediaMenu.caption":
      "推荐尺寸为 {recommendedWidth} × {recommendedHeight} 像素",
    "recordIcon.uploadFileTab.uploadError.message": "出了些问题。",
    "recordPath.untitledBlock.placeholder": "无标题",
    "referralActivatedEmail.greeting": "你好 {name} ，",
    "referralActivatedEmail.howToEarnCreditList.item.downloadApps":
      "下载<mobilelink>移动应用</mobilelink>和<desktoplink>桌面应用</desktoplink>。",
    "referralActivatedEmail.howToEarnCreditList.item.installWebClipper":
      "为 Chrome 安装<webclipperlink> Notion 网页剪裁器</webclipperlink>。",
    "referralActivatedEmail.howToEarnCreditList.item.keepInviting":
      "多多<referlink>邀请</referlink>朋友和同事。",
    "referralActivatedEmail.notionTeamSignoffAndThanks":
      "感谢你将 Notion 告诉亲朋好友，{br} ──來自 Notion 团队",
    "referralActivatedEmail.rewardMessage":
      "你的帐户已赚取<b> {creditValue} 的积分</b>！可以使用积分来<upgradelink>升级</upgradelink>并完全利用 Notion 的所有强大功能。{br}{br}想要<upgradelink>赚取更多的积分</upgradelink>吗？可以通过以下几种方法：",
    "referralActivatedEmail.signupText":
      "收到你的邀请后，有人注册了 Notion 帐户。",
    "referralActivatedEmail.subjectLine": "{creditValue}积分即将到帐！",
    "referralEmail.creditInfo.text":
      "注册后，我们会将<b> {creditDollarAmount} </b>放入你的帐户。可以用它来升级并发现 Notion 提供的所有强大功能。",
    "referralEmail.invitedIntro.text":
      "<b> {fromUserName} </b> ({fromUserEmail}) 邀请你加入 Notion！ {br}{br} Notion 是一种多合一的信息工具，帮助你保持生活和工作井井有条。在我们的<referlink>网站</referlink>上可以了解更多相关信息。",
    "referralEmail.signupPrompt":
      "<b> <signuplink>点击此处注册并赚取 {creditDollarAmount} 积分</signuplink> </b>",
    "referralEmail.subjectLine": "{fromUserName} 邀请你加入Notion",
    "regionSettings.region.label": "地区",
    "regionSettings.region.subtitle": "影响日期、数字和货币的默认格式",
    "regionalFormatSettings.customDateFormat.applyChanges": "应用更改",
    "regionalFormatSettings.customDateFormat.title": "自定义格式",
    "regionalFormatSettings.customSettingOption.fullDate.custom": "单个设置",
    "regionalFormatSettings.customSettingOption.fullDate.full": "完整日期",
    "regionalFormatSettings.customSettingOption.fullDate.iso": "ISO格式",
    "regionalFormatSettings.customSettingOption.fullDate.long": "全部",
    "regionalFormatSettings.customSettingOption.fullDate.medium": "中间",
    "regionalFormatSettings.customSettingOption.fullDate.short": "简单",
    "regionalFormatSettings.customSettingOption.number.number": "数字",
    "regionalFormatSettings.customSettingOption.number.percent": "百分比",
    "regionalFormatSettings.customSettingOption.number.withCommas":
      "包含逗号的数字",
    "regionalFormatSettings.customSettingOption.shortDate.custom": "单个设置",
    "regionalFormatSettings.customSettingOption.shortDate.iso": "ISO格式",
    "regionalFormatSettings.customSettingOption.shortDate.short": "简单",
    "regionalFormatSettings.customSettingOption.weekStartOn.monday": "星期一",
    "regionalFormatSettings.customSettingOption.weekStartOn.sunday": "周日",
    "regionalFormatSettings.defaultRegionalSettings.startDayOfWeek.monday":
      "星期一",
    "regionalFormatSettings.defaultRegionalSettings.startDayOfWeek.sunday":
      "周日",
    "regionalFormatSettings.defaultSetting.fullDate": "完整日期",
    "regionalFormatSettings.defaultSetting.numbers": "数字",
    "regionalFormatSettings.defaultSetting.shortDate": "日期简写",
    "regionalFormatSettings.defaultSetting.weekStart": "一周的开始日期",
    "regionalFormatSettings.label.subtitle": "自动应用你所在地区的标准格式",
    "regionalFormatSettings.label.title": "使用区域默认值",
    "relationHelpers.autoInverseRelation.name":
      "与{sourceCollectionName}相关 ({sourceRelationName})",
    "relationHelpers.autoInverseRelation.untitledDatabase": "无标题数据库",
    "relationHelpers.autoInverseRelation.untitledRelation": "无标题关系",
    "relationHelpers.autoInverseRelationSimple.name": "{sourceCollectionName}",
    "relationHelpers.autoInverseRelationWithIcon.name":
      "{sourceCollectionIcon} {sourceCollectionName}",
    "relationHelpers.autoRelation.name": "{targetCollectionName}",
    "relationHelpers.autoRelationWithIcon.name":
      "{targetCollectionIcon} {targetCollectionName}",
    "relationHelpers.autoSelfRelation.name": "相关 {targetCollectionName}",
    "relationHelpers.autoSelfRelationInverse.name":
      "逆相关 {sourceCollectionName}",
    "relationPropertyMenu.addAPage.button": "添加页面",
    "relationPropertyMenu.mobileDoneButton": "完成",
    "relationPropertyMenu.mobileMenuDone.button": "完成",
    "relationPropertyMenu.mobileRelationMenu.title": "关联",
    "relationPropertyMenu2.searchPlaceholder": "链接或创建页面…",
    "relationToken.title.placeholder": "键入标题...",
    "removeUsersFromSpace.nonexistentSpace.error.message": "空间不存在。",
    "removeUsersFromSpace.nonexistentUser.error.message": "用户不存在。",
    "removeUsersFromSpace.removingLastAdmin.error.message":
      "哎呀！你不能删除最后一个管理员。",
    "renameFileMenuPopup.input.placeholder": "无标题",
    "replitBlock.embeds.button.label": "嵌入 Repl",
    "replitBlock.embeds.caption": "适用于 Replit。",
    "replitBlock.placeholder": "嵌入 repl",
    "reportPage.additionalInformation.placeholder": "输入附加信息(可选)",
    "reportPage.helpButton.caption": "Notion 的内容政策",
    "reportPage.reportReasons.inappropriate_content": "内容不当",
    "reportPage.reportReasons.other_content_policy_violation": "其他",
    "reportPage.reportReasons.phishing_or_spam": "网络钓鱼或垃圾邮件",
    "reportPageModal.cancelButton.label": "取消",
    "reportPageModal.closeButton.label": "关闭",
    "reportPageModal.mobile.title": "举报页面",
    "reportPageModal.offlineMessage.description": "请连接网络后进行举报。",
    "reportPageModal.reportButton.label": "举报",
    "reportPageModal.reportReasons.other_content_policy_violation": "其他",
    "reportPageModal.reportReasons.phishing_or_spam": "网络钓鱼或垃圾邮件",
    "reportPageModal.somethingWentWrong.label": "出了些问题。",
    "reportPageModal.thanksForReporting":
      "感谢你举报此页面，我们的团队将进行查看。",
    "reportPageModal.title": "为什么要举报此页面？",
    "requestAccessForm.cancelButton.label": "取消",
    "requestAccessForm.messageInput.placeholder": "消息（可选）",
    "requestAccessForm.mobileSend.label": "发送",
    "requestAccessForm.sendRequestButton.label": "发送请求",
    "requestAccessForm.sendRequestButton.title": "申请访问权限",
    "requestAccessForm.title.label": "申请访问权限",
    restrictedPageTitle: "无访问权限",
    "restrictedPermissionConfirmationModal.actionButton.cancel": "关闭",
    "restrictedPermissionConfirmationModal.actionButton.restoreAccess":
      "恢复访问权限",
    "restrictedPermissionConfirmationModal.actionButton.restrictAccess":
      "限制访问",
    "restrictedPermissionConfirmationModal.footer.whisperText":
      "管理员仍然可以为受限页面恢复权限。",
    "restrictedPermissionConfirmationModal.permissionGroup.generic": "权限",
    "restrictedPermissionConfirmationModal.permissionGroup.group": "群组",
    "restrictedPermissionConfirmationModal.permissionGroup.space": "工作区",
    "restrictedPermissionConfirmationModal.permissionGroup.user": "用户",
    "restrictedPermissionConfirmationModal.remove.description":
      "确定要更改此角色并限制访问吗？此页面将不再继承父页面的分享设置。",
    "restrictedPermissionConfirmationModal.restore.description":
      "确定要恢复访问权限吗？将从父页面继承以下权限：",
    "restrictedPermissionConfirmationModal.restoreNoChanges.description":
      "确定要恢复访问权限吗？",
    "restrictedPermissionConfirmationModal.restrict.description":
      "确定要删除此{permissionGroup}并限制访问权限吗？此页面将不再继承父页面的分享设置。",
    "revokeTokenButton.tooltip": "撤销此令牌。",
    "richTextMenu.boldButton.tooltip": "加粗",
    "richTextMenu.equationButton.tooltip": "创建公式",
    "richTextMenu.italicsButton.tooltip": "斜体",
    "richTextMenu.linkButton.tooltip": "链接",
    "richTextMenu.markAsCodeButton.tooltip": "标记为代码",
    "richTextMenu.mentionButton.tooltip": "提及人员、页面或日期…",
    "richTextMenu.strikeThroughButton.tooltip": "删除线",
    "richTextMenu.turnIntoButton.label": "转换成",
    "richTextMenu.turnIntoButton.tooltip": "转换成",
    "richTextMenu.underlineButton.tooltip": "下划线",
    "router.loginWithSamlError.message": "无法登录。",
    "router.renderErrorPage.message.part1": "糟糕，出了些问题。",
    "router.renderErrorPage.message.part2":
      "请刷新并重试，或者<textlink>向支持人员发送消息</textlink>。",
    "router.renderErrorPage.reloadButton.label": "刷新",
    "samlErrors.couldNotDownloadIdpMetadata.message":
      "无法下载 SAML IDP 元数据。请检查你的 IDP 元数据 URL 是否正确。",
    "samlErrors.couldNotParseIdentityProviderMetadataXML.message":
      "无法解析 IDP 元数据 XML。",
    "samlErrors.couldNotParseIdpMetadata.message":
      "无法解析 SAML IDP 元数据。请检查你的 IDP 元数据是否正确。",
    "samlErrors.disableTogglingPageAccessRequestsForNonMembers":
      "当前已禁用非工作区成员的页面访问请求。",
    "samlErrors.domainVerificationConfigHasDomain.message":
      "SAML 配置已具有尝试添加的域。",
    "samlErrors.domainVerificationDnsFailed.message":
      "DNS 记录不包含正确的 Notion 验证码 TXT 记录。",
    "samlErrors.domainVerificationInvalidDomain.message":
      "域的值无效。请正确调整格式并确保未保留域：{domain}",
    "samlErrors.domainVerificationhasPending.message":
      "此域已有待处理的域名验证。",
    "samlErrors.emailDomainAlreadyConfigured.message":
      "此电子邮件域名已在现有工作区设置过 SAML。",
    "samlErrors.emailDomainWorkspaceCreationIsEducationDomain.message":
      "无法阻止基于教育电子邮件域名创建工作区。",
    "samlErrors.emailNotConfiguredForSamlSso.message":
      "此电子邮件未配置为此工作区的SAML SSO。请与管理员联系。",
    "samlErrors.incorrectURL.message":
      "SAML 断言中的 Audience 必须为 {correctUrl}",
    "samlErrors.incorrectlyConfiguredSaml.message":
      "SAML SSO 配置错误。请联系你的管理员。",
    "samlErrors.invalidIDPURL.message": "IDP 元数据 URL 是无效的 URL。",
    "samlErrors.invalidSamlConfiguration.message":
      "无效的 SAML 配置。请联系你的管理员。",
    "samlErrors.samlNameIdEmailRequired.message":
      "SAML 名称 ID 属性必须是邮箱地址。请联系你的管理员。",
    "samlErrors.samlRequired.message": "你必须使用 SAML SSO 以登录 Noion",
    "saveChanges.errorDialog.blocksCannotBeMovedInsideSelf.message":
      "嘿！块不能移动到它们自己里面。",
    "saveEditsError.message": "保存编辑时存在问题。请给我们发消息寻求帮助。",
    "saveEditsError.mobile.message":
      "保存编辑时存在问题。请给我们发消息寻求帮助。",
    "scimTableLegacyUserCell.tooltip": "此令牌由不再是工作区管理员的用户创建。",
    "scimTokenSettings.NewSCIMTokenButton.title": "添加令牌",
    "scimTokenSettings.NewSCIMTokenButton.unableToCreateTokenMessage.spaceHasLegacyToken":
      "要创建新的 SCIM 令牌，请撤销现有令牌。",
    "scimTokenSettings.NewSCIMTokenButton.unableToCreateTokenMessage.undefined":
      "目前无法创建新的 SCIM 令牌。请稍后再试。",
    "scimTokenSettings.NewSCIMTokenButton.unableToCreateTokenMessage.userHasExistingToken":
      "你已经拥有注册过的 SCIM 令牌。如要创建新的令牌，请撤销你之前创建的令牌。",
    "scimTokenSettings.error.failedCreatingNewScimToken":
      "无法创建新的 SCIM 令牌，请稍后重试。",
    "scroller.scrollDown.name": "向下滚动",
    "search.addFilter.button.label": "添加筛选器",
    "search.dateMenu.dateMessage": "选择或输入日期...",
    "search.dateRangeMenu.endingMessage": "结束",
    "search.dateRangeMenu.startingMessage": "开始",
    "search.filterBarFilter.title":
      "{filterName}{colon} {filterOperator} {filterValues}",
    "search.filterMenu.addAPersonButton.label": "添加人员",
    "search.filterMenu.addATeamButton.label": "添加团队",
    "search.filterMenu.deletedOnlyToggle.label": "仅删除的内容",
    "search.filterMenu.devSection.title": "开发工具",
    "search.filterMenu.moreFilters.Date": "日期",
    "search.filterMenu.moreFilters.created": "创建时间",
    "search.filterMenu.moreFilters.createdBy": "创建者",
    "search.filterMenu.moreFilters.date": "日期",
    "search.filterMenu.moreFilters.inPage": "在页面中",
    "search.filterMenu.moreFilters.inTeams": "团队中",
    "search.filterMenu.moreFilters.lastEdited": "上次编辑",
    "search.filterMenu.moreFilters.parentPage": "页中",
    "search.filterMenu.moreFilters.person": "人员",
    "search.filterMenu.moreFiltersSection.title": "更多筛选",
    "search.filterMenu.onlyMatchTitlesToggle.label": "仅搜索标题",
    "search.filterMenu.quickFilters.createdByMe": "由我创建",
    "search.filterMenu.quickFilters.editedLastWeek": "编辑于上周",
    "search.filterMenu.quickFilters.inCurrentPage": "在当前页面",
    "search.filterMenu.quickFiltersSection.title": "快速筛选",
    "search.filterMenu.searchPeople.placeholder": "搜索人员",
    "search.filterMenu.searchTeams.placeholder": "搜索团队",
    "search.filterMenu.searchTeams.resultsTitle": "选择团队",
    "search.filterMenu.showSource.label": "显示调试信息",
    "search.header.addFilter.button.label": "添加筛选器",
    "search.header.badSearch.button.label": "报告错误搜索",
    "search.inputMenu.errorMessage": "出了些问题。",
    "search.inputMenu.loading.message": "载入中…",
    "search.inputMenu.noResults.message": "未找到结果。",
    "search.recentMenuItem.createdDateAfter.subtitle": "创建于 {startDate}之后",
    "search.recentMenuItem.createdDateBefore.subtitle":
      "创建于 {startDate}之前",
    "search.recentMenuItem.createdDateWithRange.subtitle":
      "创建于 {startDate}至 {endDate}",
    "search.recentMenuItem.lastEditedDateAfter.subtitle":
      "上次编辑于 {startDate}之后",
    "search.recentMenuItem.lastEditedDateBefore.subtitle":
      "上次编辑于 {endDate}之前",
    "search.recentMenuItem.lastEditedDateWithRange.subtitle":
      "上次编辑于 {startDate}至 {endDate}",
    "search.recentMenuItem.listOfPeopleOrPages.label":
      "{firstPageOrPerson} + {numberRemaining}",
    "search.recentMenuItem.onlyMatchTitles.subtitle": "仅匹配标题",
    "search.recentMenuItemDetail.createdBy.subtitle": "由{people}创建",
    "search.recentMenuItemDetail.editedBy.subtitle": "由{people}编辑",
    "search.recentMenuItemDetail.inPage.subtitle": "在{pages}中",
    "search.recentPagesTimeBuckets.older.text": "更早",
    "search.recentPagesTimeBuckets.past30Days.text": "过去 30 天",
    "search.recentPagesTimeBuckets.pastWeek.text": "上周",
    "search.recentPagesTimeBuckets.today.text": "今天",
    "search.recentPagesTimeBuckets.yesterday.text": "昨天",
    "search.sort.sortMenuTitle": "排序方式",
    "search.sort.sortOrder.bestMatches": "最佳匹配",
    "search.sort.sortOrder.created.newestFirst": "创建时间：最新优先",
    "search.sort.sortOrder.created.oldestFirst": "创建时间：最早优先",
    "search.sort.sortOrder.lastEdited.newestFirst": "上次编辑：最新优先",
    "search.sort.sortOrder.lastEdited.oldestFirst": "上次编辑：最早优先",
    "searchDateFilter.acceptButton.label": "接受",
    "searchDateFilter.applyButton": "应用",
    "searchDateFilter.cancelButton.label": "取消",
    "searchDateFilter.clearButton": "清除",
    "searchDateFilter.shortTitle": "日期",
    "searchErrorMenuItem.error.genericErrorMessage": "出了些问题",
    "searchErrorMenuItem.error.noResults": "无结果",
    "searchErrorMenuItem.errorPrompt.goOnline": "连接到网络以获取更多结果。",
    "searchErrorMenuItem.errorPrompt.refreshOrReport":
      "尝试刷新或<reportlink>报告问题</reportlink>。",
    "searchErrorMenuItem.errorPrompt.searchDeleted":
      "某些结果可能位于已删除的页面中。{br}<searchdeleted>搜索已删除的页面</searchdeleted>",
    "searchErrorMenuItem.errorPrompt.searchTerms": "尝试不同的搜索词",
    "searchErrorMenuItem.errorPrompt.searchTermsAndFilters":
      "尝试不同的搜索词或筛选",
    "searchFooter.helpText.openHint": "打开",
    "searchFooter.helpText.openNewTab": "在新标签页中打开",
    "searchFooter.helpText.openNewWindow": "在新窗口中打开",
    "searchFooter.helpText.selectHint": "选择",
    "searchHelpers.afterStartDate": "在 {startDate}之后",
    "searchHelpers.beforeEndDate": "在 {endDate}之前",
    "searchHelpers.betweenStartAndEndDates": "{startDate} - {endDate}",
    "searchInputMenuItem.placeholder.namedPage": "在 {pageTitle} 中搜索…",
    "searchInputMenuItem.placeholder.namedSpace": "搜索 {spaceName}…",
    "searchInputMenuItem.placeholder.unnamedPage": "在页面中搜索…",
    "searchPageFilter.searchTokenFilter.addAPage.button": "添加另一个页面",
    "searchPageFilter.searchTokenFilter.resultSection.title": "选择页面",
    "searchPageFilter.searchTokenFilter.tokenInput.placeholder": "搜索页面…",
    "searchTokenFilter.applyButton": "应用",
    "searchTokenFilter.clearButton": "清除",
    "securitySAMLSettings.SAMLSection.helpButton.label": "了解 SAML 和单点登录",
    "securitySAMLSettings.SAMLSection.uneditableMessage":
      "SAML 正在由工作区<bold>{workspaceName}</bold>管理。请到那里更改相关 SAML 设置。",
    "securitySAMLSettings.SAMLSingleSignOnSection.automaticallyCreateAccounts.caption":
      "允许用户创建 Notion 帐户，而无需从 IDP 配置。",
    "securitySAMLSettings.SAMLSingleSignOnSection.automaticallyCreateAccounts.label":
      "登录时自动创建帐户",
    "securitySAMLSettings.SAMLSingleSignOnSection.enableSAML.caption":
      "这将允许用户使用已配置的域名上的邮箱地址通过 SAML 登录。SAML 身份验证可以在下面强制执行。",
    "securitySAMLSettings.SAMLSingleSignOnSection.enableSAML.label":
      "启用 SAML",
    "securitySAMLSettings.SAMLSingleSignOnSection.enableSAML.tooltip":
      "SAML 完全配置后方可启用。",
    "securitySAMLSettings.SAMLSingleSignOnSection.enforceSAML.captionMulti":
      "强制执行后，在上面配置的电子邮件域名中到工作区成员只能使用 SAML SSO 登录。管理员帐户仍可以使用电子邮件登录。",
    "securitySAMLSettings.SAMLSingleSignOnSection.enforceSAML.label":
      "强制使用 SAML",
    "securitySAMLSettings.SAMLSingleSignOnSection.enforceSAML.tooltip":
      "启用 SAML 后变更此选项。",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.IdentityProviderMetadataURLOption.label":
      "IDP 元数据 URL",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.IdentityProviderMetadataXMLOption.caption":
      "输入你的身份提供商（IDP）提供的值。",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.IdentityProviderMetadataXMLOption.input.placeholder":
      "IDP 元数据 XML",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.IdentityProviderMetadataXMLOption.label":
      "IDP 元数据 XML",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.title":
      "单点登录 URL",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.url.caption":
      "在身份提供商的 SAML 配置中输入此内容。",
    "securitySAMLSettings.SAMLSingleSignOnSection.singleSignOnURLSettings.url.tooltip":
      "复制链接",
    "securitySAMLSettings.SAMLSingleSignOnSection.title": "SAML 单点登录",
    "securitySAMLSettings.SCIMSection.helpButton.label": "了解 SCIM",
    "securitySAMLSettings.SCIMSection.title": "SCIM 配置",
    "securitySAMLSettings.SetupInformationSection.samlSSOEntityID":
      "SSO/SAML 实体 ID",
    "securitySAMLSettings.SetupInformationSection.samlSSOEntityID.copyTooltip":
      "点击可复制链接",
    "securitySAMLSettings.SetupInformationSection.samlSSOEntityIDLink":
      "SAML 单点登录/SAML 实体 ID",
    "securitySAMLSettings.SetupInformationSection.scimBaseUrl": "SCIM 基础 URL",
    "securitySAMLSettings.SetupInformationSection.scimBaseUrl.copyTooltip":
      "点击可复制链接",
    "securitySAMLSettings.SetupInformationSection.title": "设置信息",
    "securitySAMLSettings.SetupInformationSection.workspaceId": "工作区 ID",
    "securitySAMLSettings.SetupInformationSection.workspaceId.copyTooltip":
      "点击可复制 ID",
    "securitySAMLSettings.cancelButton.label": "取消",
    "securitySAMLSettings.disableGuests.confirmationModal.confirmButton.label":
      "是的",
    "securitySAMLSettings.disableGuests.confirmationModal.message":
      "是否确定？此工作区中的所有访客都将被移除。",
    "securitySAMLSettings.emailDomainsSection.addDomain": "添加域名",
    "securitySAMLSettings.emailDomainsSection.emailInput.captionNoSupportLink":
      "启用 SAML 后，任何具有以下域名的邮箱地址的都可以使用 SAML SSO 登录。",
    "securitySAMLSettings.emailDomainsSection.removeDomain.accept": "删除域名",
    "securitySAMLSettings.emailDomainsSection.removeDomain.cancel": "取消",
    "securitySAMLSettings.emailDomainsSection.removeDomain.description":
      "如果该域名已经过验证，则删除该域名将阻止使用该电子邮件的其他人使用 SSO 登录。",
    "securitySAMLSettings.emailDomainsSection.removeDomain.message":
      "确定要删除此域名？",
    "securitySAMLSettings.emailDomainsSection.statusToken.expired": "已过期",
    "securitySAMLSettings.emailDomainsSection.statusToken.invalid": "无效",
    "securitySAMLSettings.emailDomainsSection.statusToken.notVerified":
      "未验证",
    "securitySAMLSettings.emailDomainsSection.statusToken.verified": "已验证",
    "securitySAMLSettings.emailDomainsSection.title": "电子邮件域名",
    "securitySAMLSettings.offline.message": "请连接网络后管理安全设置。",
    "securitySAMLSettings.preventPublicSharing.confirmationModal.confirmButton.label":
      "是的",
    "securitySAMLSettings.preventPublicSharing.confirmationModal.message":
      "是否确定？任何非工作区成员或访客将无权访问工作区中的所有页面。",
    "securitySAMLSettings.securitySection.disableExport.caption":
      "禁止任何人导出为 Markdown、CSV 或 PDF。",
    "securitySAMLSettings.securitySection.disableExport.label": "禁用导出",
    "securitySAMLSettings.securitySection.disableGuests.caption":
      "禁止任何人邀请工作区之外的人访问任何页面。",
    "securitySAMLSettings.securitySection.disableGuests.label": "禁用访客",
    "securitySAMLSettings.securitySection.disableMovingPages.caption":
      "禁止任何人通过“移动到”或“保存副本到”操作将页面移动或保存副本到其他工作区。",
    "securitySAMLSettings.securitySection.disableMovingPages.label":
      "禁止移动页面或保存副本到其他工作区",
    "securitySAMLSettings.securitySection.disablePublicAccessRequests.caption":
      "这将防止拥有页面链接的人请求访问。工作区成员始终可以请求访问权限。",
    "securitySAMLSettings.securitySection.disablePublicAccessRequests.label":
      "禁用来自非成员的页面访问请求",
    "securitySAMLSettings.securitySection.disableSpacePageEdits.caption":
      "使成员无法创建、移动、重新排序和删除顶层工作区页面。",
    "securitySAMLSettings.securitySection.disableSpacePageEdits.label":
      "阻止成员编辑工作区部分",
    "securitySAMLSettings.securitySection.preventPublicSharing.caption":
      "禁用此工作区中每个页面上“分享”菜单中的“分享到网络”选项。",
    "securitySAMLSettings.securitySection.preventPublicSharing.label":
      "禁用公共页面共享",
    "securitySAMLSettings.securitySection.title": "安全",
    "securitySAMLSettings.spaceNamesSection.spaceNameInput.caption":
      "此处的 SAML 设置适用于多个工作区。<contactlink>联系支持人员</contactlink>来添加或删除工作区。",
    "securitySAMLSettings.spaceNamesSection.title": "工作区",
    "securitySAMLSettings.updateButton.label": "更新",
    "securitySAMLSettings.upsell.caption":
      "升级到企业版即可获得高级安全设置、SAML 单点登录以及自动用户和群组配置。",
    "securitySAMLSettings.upsell.title": "升级以获得高级安全设置、SAML 和 SCIM",
    "selectableCommentMenu.addCommentPrompt.tooltip":
      "点击<invertedcolor>添加评论</invertedcolor>",
    "selectableHoverMenu.filterActions.placeholder": "搜索动作…",
    "selectionLinkButton.addLink.tooltip": "添加链接",
    "selectionLinkButton.copyLink": "复制链接",
    "selectionLinkButton.linkToPage": "链接到页面",
    "selectionLinkButton.linkToPage.linkToBlock": "链接到块",
    "selectionLinkButton.linkToPage.loading": "载入中…",
    "selectionLinkButton.linkToPage.unknownBlock": "未知块",
    "selectionLinkButton.linkToPageSection.title": "链接到页面",
    "selectionLinkButton.linkToURL": "链接到网页",
    "selectionLinkButton.linkToWebPage": "链接到网页",
    "selectionLinkButton.linkedToSection.title": "链接到",
    "selectionLinkButton.linkedToSection.webPage": "网页",
    "selectionLinkButton.mobile.title": "链接",
    "selectionLinkButton.removeLink": "移除链接",
    "selectionLinkButton.search.createNewLinkPlaceholder": "粘贴链接或搜索页面",
    "selectionLinkButton.search.editLinkPlaceholder": "编辑链接或搜索页面",
    "sendEmailDigest.emailSubjectLine":
      "{numberOfUpdates, plural, other {{workspaceName}有 {numberOfUpdates} 项更新}}",
    "sendEmailDigest.untitledSpaceName.placeholder": "无标题",
    "sendMobileAppLink.textMessage":
      "你好！点击此链接可在手机上安装 Notion： {baseURL}/mobile?download=true 不要忘了下载我们的 Mac 和 Windows 应用。祝使用愉快！",
    "sendSCIMTokenInactiveEmail.emailSubjectLine":
      "SCIM 令牌已在 {workspaceName} 撤销",
    "sendSCIMTokenInactiveEmail.untitledSpaceName.placeholder": "工作区",
    "setPageContentClassification.unknownPageName.default": "Notion 页面",
    "settingItem.buttonPopup.done.label": "完成",
    "settings.regionSettings.regionSearch": "搜索区域",
    "sharedActivity.updatedPermissionGroupCreated.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}创建了群组{groupName}}}",
    "sharedActivity.updatedPermissionGroupDeleted.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}删除了群组{groupName}}}",
    "sharedActivity.updatedPermissionGroupEdit.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}编辑了群组{groupName}}}",
    "sharedActivity.updatedPermissionGroupEditedDefault.header":
      "{numberOfAuthors, plural, other {{authorOrAuthors}编辑了群组{groupName}}}",
    "sharedContextualInviteHelpers.default.inviteMessage": "你的邀请消息",
    "sharedContextualInviteHelpers.guest.inviteMessage":
      "{userName} 已分享“ {pageName} ”。加入 {spaceName} 以查看此页面。",
    "sharedContextualInviteHelpers.guest.inviteMessage2":
      "{userName} 分享了 {pageName}。加入 {spaceName} 以查看此页面。",
    "sharedContextualInviteHelpers.member.inviteMessage":
      "{userName} 已分享“ {pageName} ”。",
    "sharedContextualInviteHelpers.member.inviteMessage2":
      "{userName} 与你分享了页面 {pageName}。",
    "sharedWithMePage.menuItem.caption": "{time}・{actorName}",
    "sharedWithMePageMenuItem.copylinkToPage.tooltip": "复制链接",
    "sharedWithMePageMenuItem.linkCopied.tooltip": "链接已复制",
    "sharedWithMePopover.earlierSection.label": "早些时候",
    "sharedWithMePopover.learnMore.prompt": "了解共享页面",
    "sharedWithMePopover.pastWeekSection.label": "上周",
    "sharedWithMePopover.sortOrder.lastEditedNewest": "上次编辑时间",
    "sharedWithMePopover.sortOrder.relevance": "相关性",
    "sharedWithMePopover.todaySection.label": "今天",
    "sharedWithMePopover.updatedEarlierSection.label": "较早更新",
    "sharedWithMePopover.updatedPastWeekSection.label": "上周更新",
    "sharedWithMePopover.updatedTodaySection.label": "今天更新",
    "sideBar.betaBadge": "试用版",
    "sideBar.newBadge": "新",
    "sidebar.addAPageButtonTeamToggle.tooltip": "添加页面",
    "sidebar.addAWorkspaceOrPrivatePage.tooltip": "添加页面",
    "sidebar.addButton.addPageTooltip": "添加页面",
    "sidebar.addButton.addTeamTooltip": "新建团队空间",
    "sidebar.betaBadge": "试用版",
    "sidebar.bookmarkedPagesSection.tooltip": "你最爱的页面。",
    "sidebar.developmentOnly.uidoc.button": "UI 文档",
    "sidebar.developmentOnly.uidoc.tooltip": "仅用于开发的设计和工程工具。",
    "sidebar.favoritesSection.header": "最爱",
    "sidebar.guestMember.createWorkspacePrompt": "创建工作区",
    "sidebar.guestMember.message":
      "你当前是工作区访客。若要查看所有工作区页面，请联系管理员将你升级为成员。",
    "sidebar.newPage.button": "新页面",
    "sidebar.openImportModalButton": "导入",
    "sidebar.openImportModalButton.tooltip": "从 Word、Markdown、HTML 等导入。",
    "sidebar.openSidebarTeamBrowserButton": "团队空间",
    "sidebar.openSidebarTeamBrowserButton.tooltip": "创建或加入更多团队空间",
    "sidebar.openTemplatePickerButton": "模板",
    "sidebar.openTemplatePickerButton.tooltip":
      "查看模板并将其保存到你的工作区中。",
    "sidebar.openTrashModalButton.tooltip": "恢复已删除的页面。",
    "sidebar.outlinerTeamToggleButton.addLabel": "添加成员",
    "sidebar.outlinerTeamToggleButton.archiveLabel": "归档团队空间",
    "sidebar.outlinerTeamToggleButton.cannotArchiveTooltip":
      "创建另一个默认团队空间，以归档此团队空间",
    "sidebar.outlinerTeamToggleButton.joinLabel": "加入团队空间",
    "sidebar.outlinerTeamToggleButton.leaveLabel": "离开团队空间",
    "sidebar.outlinerTeamToggleButton.memberViewLabel": "查看成员",
    "sidebar.outlinerTeamToggleButton.ownerViewLabel": "团队空间设置",
    "sidebar.outlinerTeamToggleButton.tooltip": "团队空间设置和成员...",
    "sidebar.overflowButton.browseTeamspaces": "浏览团队空间",
    "sidebar.privatePagesSection.tooltip": "只有你可以访问这些页面。",
    "sidebar.privateSection.header": "私人",
    "sidebar.quickFindSearch.label": "快速查找",
    "sidebar.quickFindSearch.tooltip": "搜索并快速跳转到页面",
    "sidebar.search.label": "搜索",
    "sidebar.sectionHeaderHide.tooltip": "点击以隐藏分区",
    "sidebar.sectionHeaderShow.tooltip": "点击以显示分区",
    "sidebar.sharedPagesSection.tooltip": "只有你和分享过页面的人才能访问。",
    "sidebar.sharedSection.header": "共享",
    "sidebar.teamSection.tooltip": "你的团队之一",
    "sidebar.templateIntro.content":
      "开箱即用，或根据你自己的工作流程自定义它们。",
    "sidebar.templateIntro.title": "这里有一些模板，可以帮助你入门",
    "sidebar.upgradeButton.prompt":
      "更新你的个人资料、升级到专业版或邀请新成员",
    "sidebar.workspacePagesSection.tooltip":
      "所有工作区成员都可以访问这些页面。",
    "sidebar.workspaceSection.header": "工作区",
    "sidebarActions.confirmDialog.lockedWorkspaceTopLevel.message":
      "此工作区已锁定工作区顶层页面的动作。",
    "sidebarActions.confirmDialog.movePageToPrivate.confirmButton.label":
      "移动到私人区",
    "sidebarActions.confirmDialog.movePageToPrivate.message":
      "确定要将此页面设为私有吗？ <boldtext>只有你将能够访问它。</boldtext>",
    "sidebarActions.confirmDialog.moveWorkspacePage.confirmButton.label":
      "移动页面",
    "sidebarActions.confirmDialog.moveWorkspacePage.message":
      "确定要移动此工作区页面？<boldtext>所有 {memberCount} 位成员都可以看到</boldtext>",
    "sidebarActions.confirmDialog.newWorkspacePage.confirmButton.label":
      "创建顶层页面",
    "sidebarActions.confirmDialog.newWorkspacePage.message":
      "确定要创建一个顶层页面吗？ <strongtext>此页面将在所有 {memberCount} 位成员的工作区边栏中可见。</strongtext>",
    "sidebarActions.confirmDialog.reorderWorkspaceSidebar.confirmButton.label":
      "重新排序侧边栏",
    "sidebarActions.confirmDialog.reorderWorkspaceSidebar.message":
      "确定要对工作区边栏重新排序吗？ <boldtext>这将影响所有 {memberCount} 位成员。</boldtext>",
    "sidebarActions.confirmDialog.sharePageWithWorkspace.confirmButton.label":
      "移动到工作区",
    "sidebarActions.confirmDialog.sharePageWithWorkspace.message":
      "确定与工作区分享此页面吗？<boldtext>所有 {memberCount} 位成员都将可以访问。</boldtext>",
    "sidebarAppDownload.downloadApp": "下载应用",
    "sidebarAppDownload.subtitle":
      "<boldtext>我们采用极简的桌面应用，可让你保持专注。而且该应用的速度也更快了。</boldtext>",
    "sidebarAppDownload.title": "<boldtext>试用 {os} 版 Notion</boldtext>",
    "sidebarCreateTeamModal.footer.createTeam": "创建团队空间",
    "sidebarCreateTeamModal.logo.label": "添加徽标",
    "sidebarCreateTeamModal.membersDescription.label": "邀请人员进行协作",
    "sidebarCreateTeamModal.membersTitle.label": "添加人员",
    "sidebarCreateTeamModal.teamDescription.label": "用于协作和组织页面的空间",
    "sidebarCreateTeamModal.teamScreen.addAllMembersWithWorkspaceName":
      "{numMembers, plural, other {添加 <semibold>{workspaceName}</semibold> 的所有 {numMembers} 个成员}}",
    "sidebarCreateTeamModal.teamScreen.closedTeam.caption": "封闭式",
    "sidebarCreateTeamModal.teamScreen.closedTeam.description":
      "只有团队成员才能访问团队中的页面。",
    "sidebarCreateTeamModal.teamScreen.closedTeam.title": "封闭式团队",
    "sidebarCreateTeamModal.teamScreen.descriptionPlaceholder": "团队详细信息",
    "sidebarCreateTeamModal.teamScreen.namePlaceholder": "Acme 研究所",
    "sidebarCreateTeamModal.teamScreen.openTeam.caption": "开放式",
    "sidebarCreateTeamModal.teamScreen.openTeam.description":
      "工作区中的每个人都可以访问团队中的页面。",
    "sidebarCreateTeamModal.teamScreen.openTeam.title": "开放式团队",
    "sidebarCreateTeamModal.teamScreen.permissionsLabel": "权限",
    "sidebarCreateTeamModal.teamScreen.privateTeam.caption": "私人",
    "sidebarCreateTeamModal.teamScreen.privateTeam.description":
      "只有团队成员才能访问团队中的页面。",
    "sidebarCreateTeamModal.teamScreen.privateTeam.title": "私人团队",
    "sidebarCreateTeamModal.teamScreen.teamDescriptionLabel": "描述",
    "sidebarCreateTeamModal.teamScreen.teamNameLabel": "团队空间名称",
    "sidebarCreateTeamModal.teamTitle.label": "创建新团队空间",
    "sidebarCredits.earnedCredit.message":
      "你已赚取 {creditAmountInDollars} 的积分。",
    "sidebarCredits.freeMonthMessage":
      "{numberOfMonths, plural, other {等同于 <b>{numberOfMonths} 个月</b>免费。}}",
    "sidebarExpandButton.tooltip": "锁定展开侧边栏",
    "sidebarItem.addAPageInside.popup.addTo": "添加到",
    "sidebarItem.addAPageInside.tooltip": "快速添加子页面",
    "sidebarItem.changeIconButton.tooltip": "更改图标",
    "sidebarItem.favoritedPageMenuButton.tooltip": "移除、重命名等…",
    "sidebarItem.pageMenuButton.tooltip": "删除、创建副本等…",
    "sidebarMobile.addAPageToOnlyPrivateSection.title": "添加页面",
    "sidebarMobile.addAPrivatePage.title": "添加页面",
    "sidebarMobile.addPageToWorkspace.title": "添加页面",
    "sidebarMultiSwitcher.desktopAppGetMobileApp.prompt": "获取移动应用程序",
    "sidebarMultiSwitcher.macAppButton.text": "获取 Mac 应用",
    "sidebarMultiSwitcher.windowsAppButton.text": "获取 Windows 应用",
    "sidebarOutliner.teamsSection.teamsLabel": "团队空间",
    "sidebarOutliner.teamsSection.tooltip": "你加入的团队空间。",
    "sidebarResizer.clickToToggleSidebar.message":
      "点击<invertedcolor>来{expanded, select, true {关闭} other {打开锁定}} </invertedcolor>",
    "sidebarResizer.tooltip.dragMessage":
      "拖动<invertedcolor>调整大小</invertedcolor>",
    "sidebarSettingsButton.mobile.settingsAndMembers": "设置",
    "sidebarSettingsButton.settingsAndMembers": "设置与成员",
    "sidebarStudentPlanPrompt.eligible.getFreePrompt": "获取免费个人专业版",
    "sidebarStudentPlanPrompt.eligible.message":
      "你有资格获取免费个人专业版（教育）。",
    "sidebarSwitcher.createOrJoinWorkspaceButton.prompt": "创建或加入工作区",
    "sidebarSwitcher.educationPlan.label": "个人专业版（教育）",
    "sidebarSwitcher.enterprisePlan.label": "企业版",
    "sidebarSwitcher.legacyPlan.label": "旧定价方案",
    "sidebarSwitcher.personalPlan.label": "个人版",
    "sidebarSwitcher.proPlan.label": "个人专业版",
    "sidebarSwitcher.teamPlan.label": "团队版",
    "sidebarSwitcher.teamTrialPlan.label": "团队试用版",
    "sidebarSwitcher.workspaceSubtitleWithMembers.label":
      "{planType}・{numberOfWorkspaceMembers} 位成员",
    "sidebarSwitcher.workspaceSubtitleWithoutMembers.label": "{planType}",
    "sidebarSwitcherMultiAccount.addAccount.description":
      "登录现有帐户，或使用新邮箱地址注册。你当前的帐户将保持登录状态。",
    "sidebarSwitcherMultiAccount.addAccount.title": "添加帐户",
    "sidebarSwitcherMultiAccount.addAccountButton.label": "添加另一个帐户",
    "sidebarSwitcherMultiAccount.addAccountModal.cancelButton.label": "取消",
    "sidebarSwitcherMultiAccount.createWork.description":
      "我们会检查你是否已有队友在 Notion 上。如果没有，我们将为你的团队创建新的工作区。",
    "sidebarSwitcherMultiAccount.createWork.title": "创建工作帐户",
    "sidebarSwitcherMultiAccount.errorMessage":
      "SidebarSwitcherMultiAccount 中出现意外的 createType",
    "sidebarSwitcherMultiAccount.menuItem.createWorkAccountButton.label":
      "创建工作帐户",
    "sidebarSwitcherMultiAccount.menuItem.logoutAllButton.label": "登出全部",
    "sidebarSwitcherMultiAccount.mobileMenu.title": "帐户与工作区",
    "sidebarSwitcherMultiAccount.singleAccountMenu.joinOrCreateWorkspace.label":
      "加入或创建工作区",
    "sidebarSwitcherMultiAccount.singleAccountMenu.logOut.label": "登出",
    "sidebarTeamBrowser.newTeam.button": "新建团队空间",
    "sidebarTeamBrowser.title": "所有团队和页面",
    "sidebarTeamBrowserHeader.searchFilter.placeholder": "搜索团队空间...",
    "sidebarTeamBrowserHeader.searchFilter.placeholderWithoutSpaceName":
      "搜索团队空间...",
    "sidebarTeamBrowserHeader.title": "所有团队空间",
    "sidebarTeamModal.aboutScreen.descriptionPlaceholder": "添加描述…",
    "sidebarTeamModal.teamName.nameTooLongError":
      "团队名称长度必须小于 {maxTeamNameLength} 个字符。",
    "sidebarTeamModalSettingsScreen.basedOnWorkspaceSettings":
      "基于<underline>工作区设置</underline>",
    "sidebarTeamModalSettingsScreen.dangerZone.archiveTeamCaption":
      "归档此团队空间会将其从所有团队空间成员的侧边栏中移除。",
    "sidebarTeamModalSettingsScreen.dangerZone.cannotArchive":
      "无法归档此团队空间，因为它是此工作区中唯一的默认团队空间。",
    "sidebarTeamModalSettingsScreen.dangerZone.restoreTeamButton":
      "恢复团队空间",
    "sidebarTeamModalSettingsScreen.dangerZone.restoreTeamCaption":
      "恢复此团队将在侧边栏中为之前添加的所有团队成员添加团队。",
    "sidebarTeamModalSettingsScreen.dangerZone.title": "危险区",
    "sidebarTeamModalSettingsScreen.setting.exportCaption":
      "禁止任何人导出为 Markdown、CSV 或 PDF。",
    "sidebarTeamModalSettingsScreen.setting.guestCaption":
      "禁止任何人邀请工作区之外的人访问页面。",
    "sidebarTeamModalSettingsScreen.setting.guestTitle": "禁用访客",
    "sidebarTeamModalSettingsScreen.setting.shareCaption":
      "禁用该团队中所有页面的“分享”菜单中的“分享到网络”选项。",
    "sidebarTeamModalSettingsScreen.setting.topLockCaption":
      "防止成员在侧边栏中添加、移除或重新排序团队的固定页面列表。",
    "sidebarTeamModalSettingsScreen.setting.topLockTitle":
      "防止成员编辑侧边栏固定页面",
    "sidebarTeamModalSettingsScreenPermissions.header.title": "权限",
    "sidebarTeamModalTab.option.general": "一般",
    "sidebarTeamModalTab.option.members": "成员",
    "sidebarTeamModalTab.option.permissions": "权限",
    "sidebarTeamModalTab.option.security": "安全性",
    "sidebarTeamModalTab.unownedBadge": "无主",
    "sidebarTrash.allPages.tabHeader": "所有页面",
    "sidebarTrash.deletePagePermanentlyButton.tooltip": "永久删除",
    "sidebarTrash.filterBy.noMatchesPrompt": "无匹配项。",
    "sidebarTrash.filterBy.placeholder": "按页面标题筛选…",
    "sidebarTrash.goOnline.prompt": "请连接网络后查看垃圾箱。",
    "sidebarTrash.inCurrentPage.tabHeader": "在当前页面",
    "sidebarTrash.learnMore.prompt": "了解删除和恢复页面",
    "sidebarTrash.menu.header": "垃圾箱",
    "sidebarTrash.mobileFilterBy.noMatchesPrompt": "无匹配项。",
    "sidebarTrash.restorePageButton.tooltip": "恢复",
    "sidebarTrashButton.text": "垃圾箱",
    "sidebarUnexpandButton.closeSidebar.tooltip": "关闭侧边栏",
    "signupPage.pageTitle": "注册",
    "signupPage.title": "注册",
    "signupPage.title.tryNotionMobileCTAV3": "注册以创建 Notion 页面",
    "signupPage.titleForSpace": "欢迎访问 Notion 上的 {workspaceName}",
    "simpleTable.actionBar.fitToPage": "使表格符合页面宽度",
    "simpleTable.actionBar.options": "选项",
    "simpleTable.resizer.dimensions": "{num_columns} × {num_rows}",
    "simpleTable.resizer.tooltipColumn": "<b>点击</b>以添加新列",
    "simpleTable.resizer.tooltipCorner": "<b>点击</b>以添加新行和列",
    "simpleTable.resizer.tooltipRow": "<b>点击</b>以添加新行",
    "simpleTable.resizer.tooltipSubtitleColumn":
      "<b>拖动</b>以快速添加或删除列",
    "simpleTable.resizer.tooltipSubtitleCorner":
      "<b>拖动</b>以快速添加或删除行和列",
    "simpleTable.resizer.tooltipSubtitleRow": "<b>拖动</b>以快速添加或删除行",
    "simpleTableActions.collectionColumnTitle": "列 {columnIndex}",
    "simpleTableActions.collectionTitle": "标题",
    "sketchBlock.embeds.button.label": "嵌入 Sketch",
    "sketchBlock.embeds.caption": "适用于启用了公共链接访问的 Sketch 链接",
    "sketchBlock.placeholder": "嵌入 Sketch",
    "slackActions.dialogError.loginWithSlack.errorMessage": "出了些问题。",
    "slackActions.loginPopupModal.title": "Slack 登录",
    "slackAuthorizationErrors.blockNotFound.errorMessage": "未找到块。",
    "slackAuthorizationErrors.missingEditPermission.errorMessage":
      "用户无法编辑块。",
    "slackAuthorizationErrors.webhookNotFound.errorMessage":
      "找不到 Slack 的 webhook。",
    "slackIntegrationButton.removeIntegrationConfirmationDialog.prompt":
      "确定要删除 Slack 集成服务吗？",
    "slackIntegrationButton.removeIntegrationConfirmationDialog.removeButton.label":
      "移除",
    "slackNotification.pageTitle.untitledPage.placeholder": "无标题",
    "slackNotification.welcomeMessage":
      "欢迎来到 Notion！此频道已与 Notion 的页面绑定成功 {pageLink}。你将获取有关此页面或页面内的评论、提及和编辑的更新动态。",
    "slackNotifications.blockCreated.notificationContents":
      "{userName} 在 {workspaceName} 中创建了 {blockName}",
    "slackNotifications.blockDeleted.notificationContents":
      "{userName} 在 {workspaceName} 删除了 {blockName}",
    "slackNotifications.blockEdited.notificationContents":
      "{userName} 编辑了 {blockName}",
    "slackNotifications.botInvitedYouToSpace.notificationContents":
      "你已被邀请加入{workspaceName}",
    "slackNotifications.collectionPropertyEdited.contents":
      "{userName}编辑了{collectionName}中的{propertyName}属性",
    "slackNotifications.collectionRowCreated.notificationContents":
      "{userName} 在 {collectionName} 创建了 {rowName}",
    "slackNotifications.collectionRowDeleted.notificationContents":
      "{userName} 在 {collectionName} 删除了 {rowName}",
    "slackNotifications.collectionViewEdited.contents":
      "{userName}编辑了{collectionName}中的{collectionViewName}视图",
    "slackNotifications.defaultPropertyName.label": "属性",
    "slackNotifications.emptyPropertyValue.label": "空",
    "slackNotifications.equationAuthorName.notificationTitle": "公式",
    "slackNotifications.permissionChanged.notificationBody":
      "{permissionTarget}：{permissionsBefore} → {permissionsAfter}",
    "slackNotifications.permissionsCreatedOrDeletedText.notificationContents":
      "{permissionTarget}：{permissions}",
    "slackNotifications.permissionsEditedForBlock.notificationContents":
      "{userName} 编辑了 {blockName} 的权限",
    "slackNotifications.propertyValueChanged.notificationContents":
      "{propertyName}：{propertyValueBefore} → {propertyValueAfter}",
    "slackNotifications.propertyValueWithName.notificationContents":
      "{propertyName}：{propertyValue}",
    "slackNotifications.publicPermissions.label": "公开",
    "slackNotifications.reminderInPage.contents": "{pageName} 中的提醒",
    "slackNotifications.showMoreEditsLinkText.label":
      "{numberOfMoreEdits, plural, other {显示其余 {numberOfMoreEdits} 项编辑⋯}}",
    "slackNotifications.unknownAuthorForComment.label": "未知作者",
    "slackNotifications.unknownCollectionPropertyEdited.label": "未知",
    "slackNotifications.untitledCollectionName.label": "无标题",
    "slackNotifications.userAddedYouToSpace.notificationContents":
      "{userName}将你添加到{workspaceName}",
    "slackNotifications.userCommentedInPage.notificationContents":
      "{userName} 在 {pageName} 发表了评论",
    "slackNotifications.userDeletedPage.contents":
      "{userName} 已删除 {pageName}",
    "slackNotifications.userEditedAccountSettings.contents":
      "{userName}编辑了其帐户设定",
    "slackNotifications.userEditedCollection.notificationContents":
      "{userName} 编辑了 {collectionName}",
    "slackNotifications.userInvitedToTeam.contents":
      "{userName} 邀请你加入 {teamName} 团队",
    "slackNotifications.userInvitedYouToSpace.notificationContents":
      "{userName} 邀请你加入 {workspaceName}",
    "slackNotifications.userLockedPage.contents":
      "{userName} 锁定了 {pageName}",
    "slackNotifications.userMentionedInBlock.notificationContents":
      "{userName} 在 {pageName} 提到了你",
    "slackNotifications.userPermanentlyDeletedPage.contents":
      "{userName} 已永久删除 {pageName}",
    "slackNotifications.userRequestedAccessToBlock.contents":
      "{userName}请求访问{pageName}",
    "slackNotifications.userRestoredPage.contents":
      "{userName} 已恢复 {pageName}",
    "slackNotifications.userUnlockedPage.contents":
      "{userName} 解锁了{pageName}",
    "snackbar.undo.title": "撤消",
    "spaceActions.createGettingStartedPage.copyNotCreated.error":
      "无法创建客户端副本。",
    "spaceActions.deletingWorkspace.loadingMessage": "正在删除工作区…",
    "spaceActions.dialogError.couldNotMoveContentError.message":
      "抱歉，我们无法移动此内容。请再试一次。",
    "spaceActions.dialogError.createOrUpdatePermissionGroup.invalidWorkspaceStorage.message":
      "没有有关此工作区的本地数据。",
    "spaceActions.dialogError.createTemplatesInSpace.invalidStorage.message":
      "无效的工作区数据。",
    "spaceActions.dialogError.createTemplatesInWorkspace.invalidStorage.message":
      "无效的工作区视图数据。",
    "spaceActions.dialogError.createTemplatesInWorkspace.invalidUserSettings.message":
      "无效的用户设置数据。",
    "spaceActions.dialogError.createWorkspaceError.goOnline.message":
      "请连接网络后创建你的工作区。",
    "spaceActions.dialogError.createWorkspaceError.message":
      "抱歉，我们无法创建你的工作区。请再试一次。",
    "spaceActions.dialogError.createWorkspaceError.notLoggedIn.message":
      "必须登录。",
    "spaceActions.dialogError.forkPageError.message": "无法创建分支页面。",
    "spaceActions.dialogError.joinWorkspace.invalidWorkspaceStorage.message":
      "没有创建工作区视图数据。",
    "spaceActions.dialogError.moveContentError.cannotMovePages.message":
      "无法同时移动这些页面。",
    "spaceActions.dialogError.moveContentError.goOnline.message":
      "请连接网络后向其他工作区移动内容。",
    "spaceActions.dialogError.movetoWorkspace.notLoggedIn.message":
      "必须登录。",
    "spaceActions.dialogError.navigateToWorkspace.invalidStorage.message":
      "无效的工作区数据。",
    "spaceBasicSettings.PublicHomePageSection.caption":
      "使用{linkText}访问我们的公共主页。",
    "spaceBasicSettings.PublicHomePageSection.caption.tooltip":
      "点击可复制链接",
    "spaceBasicSettings.PublicHomePageSection.dropdownLabel": "清除",
    "spaceBasicSettings.PublicHomePageSection.dropdownLabel.noResults":
      "无结果",
    "spaceBasicSettings.PublicHomePageSection.input.placeholder":
      "选择分享到网络的页面",
    "spaceBasicSettings.PublicHomePageSection.title": "公共主页",
    "spaceBasicSettings.allowedEmailDomainsSection.emailDomainInput.caption":
      "任何在这些域名中拥有邮箱地址的人都可以自动加入你的工作区。",
    "spaceBasicSettings.allowedEmailDomainsSection.emailDomainInput.disabledDueToSaml":
      "对该设置的编辑被禁用，因为在此工作区中配置了 SAML。请更新 SAML 配置。",
    "spaceBasicSettings.allowedEmailDomainsSection.emailDomainInput.placeholder":
      "输入电子邮件域名…",
    "spaceBasicSettings.allowedEmailDomainsSection.emailDomainsDropdown.placeholder":
      "输入电子邮件域名…",
    "spaceBasicSettings.allowedEmailDomainsSection.emailDomainsDropdown.placeholderNoResults":
      "输入此工作区成员的电子邮件域名…",
    "spaceBasicSettings.allowedEmailDomainsSection.genericErrorMessage":
      "出了些问题…",
    "spaceBasicSettings.allowedEmailDomainsSection.title": "允许的电子邮件域名",
    "spaceBasicSettings.cancelButton.label": "取消",
    "spaceBasicSettings.changeDomain.cta.text": "设置自己的网域",
    "spaceBasicSettings.changeWorkspaceDomain.areYouSure":
      "确定要更改你的域名吗？",
    "spaceBasicSettings.changeWorkspaceDomain.cancelButton.label": "取消",
    "spaceBasicSettings.changeWorkspaceDomain.changeButton.label": "更改",
    "spaceBasicSettings.changeWorkspaceDomain.prompt":
      "此工作区具有公共页面。如果继续更改域名，则以 {current_domain}.notion.site 开头的任何现有链接将不再有效。",
    "spaceBasicSettings.dangerousSettingsSection.deleteWorkspaceButton.label":
      "删除整个工作区",
    "spaceBasicSettings.dangerousSettingsSection.deleteWorkspaceHelpButton.caption":
      "了解删除工作区。",
    "spaceBasicSettings.dangerousSettingsSection.leaveWorkspaceButton.label":
      "离开工作区",
    "spaceBasicSettings.dangerousSettingsSection.title": "危险区域",
    "spaceBasicSettings.deleteWorkspace.untitledWorkspace.placeholder":
      "无标题的工作区",
    "spaceBasicSettings.deleteWorkspaceConfirmationDialog.deleteWorkspaceButton.label":
      "永久删除工作区",
    "spaceBasicSettings.deleteWorkspaceConfirmationDialog.prompt":
      "此操作无法撤消。这将永久删除工作区，包括所有页面和文件。请输入工作区的名称进行确认。",
    "spaceBasicSettings.domainSection.title": "域名",
    "spaceBasicSettings.domainSection.workspaceDomainInput.joinWorkspace.caption":
      "如果有允许的电子邮件域，任何人都可以通过{linkText}链接订阅此工作空间。",
    "spaceBasicSettings.domainSection.workspaceDomainInput.placeholder":
      "你的域名",
    "spaceBasicSettings.domainSection.workspaceDomainInput.validationMessage.available":
      "可用",
    "spaceBasicSettings.domainSection.workspaceDomainInput.validationMessage.notAllowed":
      "不允许",
    "spaceBasicSettings.domainSection.workspaceDomainInput.validationMessage.used":
      "已使用",
    "spaceBasicSettings.domainSection.workspaceDomainInput.viewPublicPage.caption":
      "Web上共享的页面的地址以{linkText}开头。",
    "spaceBasicSettings.exportContentSection.exportButton.label":
      "导出所有工作区内容",
    "spaceBasicSettings.exportContentSection.helpButton.caption":
      "了解导出工作区。",
    "spaceBasicSettings.exportContentSection.title": "导出内容",
    "spaceBasicSettings.exportMembersSection.exportAsCSVButton.label":
      "将成员导出为 CSV",
    "spaceBasicSettings.exportMembersSection.helpButton.caption":
      "了解导出成员。",
    "spaceBasicSettings.exportMembersSection.title": "导出成员",
    "spaceBasicSettings.groupsTab.title": "群组",
    "spaceBasicSettings.guestLimitedAccessMessage":
      "你是当前工作区的访客。请要求管理员将你添加为成员，以查看其他页面和工作区设置。",
    "spaceBasicSettings.leaveWorkspaceConfirmationDialog.leaveButton.label":
      "离开",
    "spaceBasicSettings.leaveWorkspaceConfirmationDialog.prompt":
      "确定要离开此工作区？",
    "spaceBasicSettings.membersTab.manageMembersWithLinkCaption":
      "在这里管理成员。",
    "spaceBasicSettings.membersTab.manageMembersWithoutLinkCaption":
      "在这里管理成员，或<setupdomainlink>设置域名</setupdomainlink>以便具有此域名内邮箱地址的每个人都可以自动加入当前工作区。",
    "spaceBasicSettings.membersTab.payPerMemberCaption":
      "注意：你将为添加的每个成员付费。请访问<billingguidelink>我们的指南</billingguidelink>了解有关我们如何计费的更多信息。",
    "spaceBasicSettings.nameInput.placeholder": "例如公司名称",
    "spaceBasicSettings.offlineMessage": "请连接网络后设置。",
    "spaceBasicSettings.reprovisioningTab.title": "最近离开的用户",
    "spaceBasicSettings.spacePermissionsSettings.groupsTab.defaultNewGroupName":
      "无标题",
    "spaceBasicSettings.title": "工作区设置",
    "spaceBasicSettings.updateButton.label": "更新",
    "spaceBasicSettings.workspaceDomain.tooltip": "点击复制链接",
    "spaceBasicSettings.workspaceIconSection.caption":
      "上传图片或选择表情符号。它将显示在侧边栏和通知中。",
    "spaceBasicSettings.workspaceIconSection.title": "图标",
    "spaceBasicSettings.workspaceNameSection.nameInput.caption":
      "你可以使用你的名字或团队的名字。保持简单。",
    "spaceBasicSettings.workspaceNameSection.title": "名称",
    "spaceConnectionsSettings.connectionsDevelopment.sitelink":
      "开发自己的连接",
    "spaceConnectionsSettings.connectionsManagement.sitelink":
      "详细了解如何管理连接",
    "spaceConnectionsSettings.connectionsTable.connectionsColumn.title": "连接",
    "spaceConnectionsSettings.connectionsTable.creationInfoColumn.title":
      "用户和访问权限",
    "spaceConnectionsSettings.title": "连接",
    "spaceHelpers.getSpaceName.untitledWorkspace.name": "无标题的工作区",
    "spaceHelpers.reprovisionPrivatePages.title": "{name} 的私有页面",
    "spaceIntegrationSettings.actionMenu.contactDeveloperSupport.label":
      "联系客服",
    "spaceIntegrationSettings.actionMenu.contactDeveloperSupportButton.label":
      "联系客服",
    "spaceIntegrationSettings.actionMenu.copyInternalIntegrationTokenButton.label":
      "拷贝内部集成令牌",
    "spaceIntegrationSettings.actionMenu.copyTokenModal.closeButton.label":
      "关闭",
    "spaceIntegrationSettings.actionMenu.copyTokenModal.copyTokenButton.label":
      "拷贝令牌",
    "spaceIntegrationSettings.actionMenu.disconnectAll.label":
      "断开所有用户的连接",
    "spaceIntegrationSettings.actionMenu.disconnectAll.modal.caption":
      "撤销此工作区所有用户对 {integrationName} 的访问权限。",
    "spaceIntegrationSettings.actionMenu.disconnectAll.modal.label":
      "断开工作区中所有用户的 {integrationName} 连接",
    "spaceIntegrationSettings.actionMenu.disconnectIntegration..modal.button.disconnect":
      "断开连接",
    "spaceIntegrationSettings.actionMenu.disconnectIntegrationButton.label":
      "断开 {integrationName} 的连接",
    "spaceIntegrationSettings.actionMenu.disconnectIntegrationButton.laber":
      "断开 {integrationName} 的连接",
    "spaceIntegrationSettings.actionMenu.disconnectUser.modal.caption":
      "撤销 {userName} 对 {integrationName} 的访问权限",
    "spaceIntegrationSettings.actionMenu.disconnectUser.modal.label":
      "断开 {integrationName} 的连接？",
    "spaceIntegrationSettings.actionMenu.removeIntegration.modal.label.caption":
      "撤销工作区中的 {integrationName} 访问权限",
    "spaceIntegrationSettings.actionMenu.removeIntegration.modal.label.title":
      "断开工作区中的 {integrationName} 连接",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.label":
      "从已批准列表中移除",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.modal.button.cancel":
      "取消",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.modal.button.disconnect":
      "断开连接",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.modal.button.remove":
      "移除",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.modal.caption":
      "阻止成员安装 {integrationName}。",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApproval.modal.title":
      "将 {integrationName} 从已批准的集成中移除",
    "spaceIntegrationSettings.actionMenu.removeIntegrationApprovalAndDisconnectAll.caption":
      "撤消此工作区中所有用户对 {integrationName} 的访问权限，并阻止成员安装 {integrationName}。",
    "spaceIntegrationSettings.actionMenu.removeLegacyIntegration.caption":
      "移除工作区成员将 {integrationName} 添加到 {workspaceName} 的功能。",
    "spaceIntegrationSettings.actionMenu.removeLegacyIntegration.label":
      "移除对 {integrationName} 的访问权限",
    "spaceIntegrationSettings.actionMenu.revokeUserAccess.label":
      "断开用户的连接",
    "spaceIntegrationSettings.actionMenu.visitDeveloperWebsite.label":
      "访问开发者网站",
    "spaceIntegrationSettings.actionMenu.visitDeveloperWebsiteButton.label":
      "访问开发者网站",
    "spaceIntegrationSettings.error": "出了些问题...",
    "spaceIntegrationSettings.helpButton.caption": "了解集成管理",
    "spaceIntegrationSettings.integrationDevelopment.sitelink":
      "开发自己的集成",
    "spaceIntegrationSettings.integrationManagement.sitelink":
      "详细了解如何管理集成",
    "spaceIntegrationSettings.integrationManagementSiteLink.caption":
      "为我创建集成",
    "spaceIntegrationSettings.integrationTable.creationInfoColumn.contents":
      "{installerName} 于 {installedTime}",
    "spaceIntegrationSettings.integrationTable.emptyMessage": "未安装集成",
    "spaceIntegrationSettings.integrationTable.emptyTable.message":
      "未安装集成",
    "spaceIntegrationSettings.integrationTable.installerInfo.notion.tooltip":
      "由 Notion 开发",
    "spaceIntegrationSettings.integrationTable.installerInfoColumn.anyone":
      "{spaceName} 中的任何人",
    "spaceIntegrationSettings.integrationTable.installerInfoColumn.legacy":
      "Notion Connected 应用",
    "spaceIntegrationSettings.integrationTable.installerInfoColumn.listOfUsers":
      "{remainingCount, plural, other {{firstUser} 与 {remainingCount}+}}",
    "spaceIntegrationSettings.integrationTable.installerInfoColumn.noUsers":
      "无用户",
    "spaceIntegrationSettings.integrationTable.installerInfoColumn.notion":
      "Notion {icon}",
    "spaceIntegrationSettings.integrationTable.integrationColumn.title": "集成",
    "spaceIntegrationSettings.integrationTable.label.unknownDeveloper":
      "未知开发者",
    "spaceIntegrationSettings.integrationTable.pillLabel.importer": "导入者",
    "spaceIntegrationSettings.integrationTable.pillLabel.internal": "内部",
    "spaceIntegrationSettings.integrationTable.pillLabel.preview": "链接预览",
    "spaceIntegrationSettings.integrationTable.pillLabel.sync": "同步",
    "spaceIntegrationSettings.integrationTable.row.internalIntegrationLabel":
      "内部",
    "spaceIntegrationSettings.integrationtable.creationInfoColumn.title":
      "添加的用户",
    "spaceIntegrationSettings.title": "{workspaceName}的完整集成列表",
    "spaceInviteLinkEmail.body.cta":
      "你可以将此电子邮件转发给你的队友，邀请他们进入你的工作区。",
    "spaceInviteLinkEmail.body.label":
      "{userName}为{spaceName}创建了一个新的 Notion 工作区。点击链接加入！",
    "spaceInviteLinkEmail.subject.label": "在{spaceName}上加入你的团队",
    "spaceInviteLinkEmail.text.label":
      "你的团队正在使用 Notion 进行协作、计划和完成工作。",
    "spaceInviteLinkEmail.titleOfEmail": "在{spaceName}上加入你的团队",
    "spacePermissionSettings.memberRoleSelect.permissionitem.roleUpgradeDisabled":
      "无法升级到比成员更高的角色",
    "spacePermissionSettings.memberUpsell.alternativeTrialLabel": "免费试用",
    "spacePermissionSettings.memberUpsell.alternativeUpgradeLabel":
      "升级到团队版",
    "spacePermissionSettings.memberUpsell.caption":
      "免费试用 Notion 团队版 — 更适合多人协作的工作区、无限成员以及高级权限设置。",
    "spacePermissionSettings.memberUpsell.title": "与无限成员分享",
    "spacePermissionSettings.spaceMembers.inviteLink.caption":
      "分享这个私密链接以邀请他人加入此工作区。只有可以邀请成员的用户可见。",
    "spacePermissionSettings.spaceMembers.inviteLink.resetLink":
      "你可以为工作区所有成员<resetlink>重置链接</resetlink>以生成新的邀请链接。",
    "spacePermissionSettingsTrialModal.cancel.label": "取消",
    "spacePermissionSettingsTrialModal.tryItFree.label": "免费试用",
    "spacePermissionsSettings.groupsTab.adminsOnly":
      "只有管理员可以添加权限群组。",
    "spacePermissionsSettings.groupsTab.caption":
      "设置群组以便在分享菜单中方便地控制页面权限。",
    "spacePermissionsSettings.groupsTab.captionWithTeams":
      "设置群组来批量管理团队成员。只有工作区管理员可以向团队添加群组。",
    "spacePermissionsSettings.groupsTab.captionWithTeamsV2":
      "设置群组以简化共享菜单中的页面权限，并批量管理团队空间成员。",
    "spacePermissionsSettings.groupsTab.createGroupButton.label": "创建群组",
    "spacePermissionsSettings.groupsTab.deleteGroupModal.confirmationButton.label":
      "是的",
    "spacePermissionsSettings.groupsTab.deleteGroupModal.confirmationMessage":
      "确定要删除此群组吗？此群组的所有私人页面都将转移给你。",
    "spacePermissionsSettings.groupsTab.filterGroupNamesInput.placeholder":
      "按群组名称筛选...",
    "spacePermissionsSettings.groupsTab.groupList.actionMenu.createTeamFromGroup":
      "从群组创建团队空间",
    "spacePermissionsSettings.groupsTab.groupList.actionMenu.deleteItem":
      "删除",
    "spacePermissionsSettings.groupsTab.groupList.actionMenu.renameItem":
      "重命名",
    "spacePermissionsSettings.groupsTab.groupList.addMemberButton.label":
      "添加成员",
    "spacePermissionsSettings.groupsTab.removeMemberFromGroupButton.label":
      "移除",
    "spacePermissionsSettings.groupsTab.removeMemberFromGroupDialog.confirmationButton.label":
      "是的",
    "spacePermissionsSettings.groupsTab.removeMemberFromGroupDialog.confirmationMessage":
      "确定要移除此成员？",
    "spacePermissionsSettings.groupsTab.showMoreUsersButton.label":
      "{numberOfHiddenUsers, plural, other {显示其他 {numberOfHiddenUsers} 位}}",
    "spacePermissionsSettings.groupsTab.spaceGroupsTable.groups": "群组",
    "spacePermissionsSettings.groupsTab.spaceGroupsTable.member": "成员",
    "spacePermissionsSettings.groupsTab.spaceGroupsTable.noGroupsFound":
      "未找到任何群组。",
    "spacePermissionsSettings.groupsTab.spaceGroupsTable.teams": "团队空间",
    "spacePermissionsSettings.groupsTab.upgradeCaption":
      "升级到团队版以从“分享”菜单设置群组并控制权限。",
    "spacePermissionsSettings.groupsTab.upgradeTitle": "升级以创建群组。",
    "spacePermissionsSettings.groupsTab.userGroup.addUserButton.label": "添加",
    "spacePermissionsSettings.groupsTab.userGroup.groupIcon.tooltip":
      "添加图标",
    "spacePermissionsSettings.groupsTab.userGroup.groupNameInput.placeholder":
      "无标题",
    "spacePermissionsSettings.groupsTab.userGroup.memberCount":
      "{numberOfGroupMembers, plural, other {{numberOfGroupMembers} 位成员}}",
    "spacePermissionsSettings.groupsTab.userGroup.searchUserDropdown.noResultsMessage":
      "无结果",
    "spacePermissionsSettings.groupsTab.userGroup.teamsCount":
      "{numberOfTeams, plural, other {{numberOfTeams} 个团队空间}}",
    "spacePermissionsSettings.groupsTab.userGroup.teamsCountNone": "无",
    "spacePermissionsSettings.groupsTab.userGroup.userSearchInput.placeholder":
      "搜索人员…",
    "spacePermissionsSettings.groupsTab.workspaceOwnersOnly":
      "只有工作区所有者才能添加权限组。",
    "spacePermissionsSettings.guestsTab.title": "访客 ({numberOfGuests})",
    "spacePermissionsSettings.helpButton.caption": "了解如何将成员添加到工作区",
    "spacePermissionsSettings.inviteLinkRefreshModal.accept": "重置",
    "spacePermissionsSettings.inviteLinkRefreshModal.description":
      "确定要为工作区所有成员重置邀请链接？旧链接将无法再使用。",
    "spacePermissionsSettings.membersTab.filterGuestsInput.placeholder":
      "按邮箱地址或姓名筛选…",
    "spacePermissionsSettings.membersTab.filterMembersInput.placeholder":
      "按邮箱地址或姓名筛选…",
    "spacePermissionsSettings.membersTab.showMore.message":
      "显示其余 {moreMembersCount} 位",
    "spacePermissionsSettings.membersTab.showMoreGuestsButton.label":
      "{numberOfHiddenGuests, plural, other {显示其他 {numberOfHiddenGuests} 位}}",
    "spacePermissionsSettings.membersTab.title": "成员 ({numberOfMembers})",
    "spacePermissionsSettings.offlineMessage": "请连接网络后管理成员。",
    "spacePermissionsSettings.reprovision.toUser.title": "转移私人页面",
    "spacePermissionsSettings.reprovisionPrivatePagesConfirmationDialog.confirmButton.label":
      "转移私人页面",
    "spacePermissionsSettings.reprovisionPrivatePagesConfirmationDialog.confirmationMessage":
      "确定要转移他们的私人页面吗？此动作无法撤消。",
    "spacePermissionsSettings.reprovisioningTab.caption":
      "查看最近成为工作区一部分且具有可恢复的私人页面的用户。",
    "spacePermissionsSettings.reprovisioningTab.workspaceOwner.caption":
      "查看过去 30 天内以前属于该工作区的用户。只有工作区所有者才能看到此信息。",
    "spacePermissionsSettings.spaceMembers.inviteLink.copyButton": "复制链接",
    "spacePermissionsSettings.spaceMembers.inviteLink.shareButton": "分享链接",
    "spacePermissionsSettings.spaceMembers.inviteLink.title": "邀请链接",
    "spacePermissionsSettings.spaceMembers.members.title": "成员",
    "spacePermissionsSettings.updatePermissionsMessage": "更新中…",
    "spacePermissionsSettings.user.admin": "管理员",
    "spacePermissionsSettings.user.membershipAdmin": "成员资格管理员",
    "spacePermissionsSettings.user.workspaceOwner": "工作区所有者",
    "spacePermissionsSettings.userTable.accessLevelColumn.header": "访问权限",
    "spacePermissionsSettings.userTable.actionLevelColumn.header": "操作",
    "spacePermissionsSettings.userTable.pageCountColumn.header": "私人页面",
    "spacePermissionsSettings.userTable.teamsColumn.header": "团队",
    "spacePermissionsSettings.userTable.userColumn.header": "用户",
    "spaceSettings.closeSettingsDialog.cancelationButton.label": "否",
    "spaceSettings.closeSettingsDialog.confirmationButton.label": "是",
    "spaceSettings.closeSettingsDialog.confirmationMessage":
      "你的更改尚未保存。保存更改？",
    "spaceSettings.closeSettingsDialog.updateSettingsButton.label": "保存",
    "spaceSettings.sidebar.button.upgrade": "升级方案",
    "spaceSettings.sidebar.personalSettingsSection.title": "我",
    "spaceSettings.sidebar.upgradeLink": "升级以无限使用",
    "spaceSettings.sidebar.workspaceSettingsSection.title": "工作区",
    "spaceSettingsDebugZone.userUserSimilarity.title": "用户相似度",
    "spaceSettingsSidebar.accountTab.title": "我的帐户",
    "spaceSettingsSidebar.auditLogTab.title": "审计日志",
    "spaceSettingsSidebar.billingTab.title": "账单",
    "spaceSettingsSidebar.connectedAppsTab.title": "我绑定的应用",
    "spaceSettingsSidebar.creditTab.title": "赚取积分",
    "spaceSettingsSidebar.debugZoneTab.title": "调试区",
    "spaceSettingsSidebar.experimentsTab.title": "实验",
    "spaceSettingsSidebar.identity&ProvisioningTab.title": "身份和配置",
    "spaceSettingsSidebar.integrationsTab.title": "集成",
    "spaceSettingsSidebar.languageAndRegionTab.title": "语言与地区",
    "spaceSettingsSidebar.membersTab.title": "成员",
    "spaceSettingsSidebar.notificationsAndSettings.title": "我的通知与设置",
    "spaceSettingsSidebar.plansTab.title": "定价方案",
    "spaceSettingsSidebar.securityAndSAMLTab.title": "安全与身份",
    "spaceSettingsSidebar.securityTab.title": "安全",
    "spaceSettingsSidebar.settingsTab.title": "设置",
    "spaceSettingsSidebar.spaceConnectionsTab.title": "连接",
    "spaceSettingsSidebar.subscriptionTab.title": "订阅",
    "spaceSettingsSidebar.teamsTab.title": "团队空间",
    "spaceSettingsSidebar.upgradeTab.title": "升级",
    "spaceSettingsSidebar.userConnectionsTab.title": "我的连接",
    "spaceSubscriptionBilling.addButton.label": "添加",
    "spaceSubscriptionBilling.address.invalidError":
      "你的地址无效。请更新你的地址，以便我们能够处理你的付款。",
    "spaceSubscriptionBilling.apply.label": "使用",
    "spaceSubscriptionBilling.applyCouponModal.successMessage":
      "已使用优惠券！",
    "spaceSubscriptionBilling.applyCouponModal.title": "使用优惠券",
    "spaceSubscriptionBilling.applyCreditButton.label": "使用积分",
    "spaceSubscriptionBilling.cancelButton.label": "取消",
    "spaceSubscriptionBilling.changeBillingAddressModal.cancelButton.label":
      "取消",
    "spaceSubscriptionBilling.changeBillingAddressModal.updateButton.label":
      "更新",
    "spaceSubscriptionBilling.changeBillingEmailModal.title":
      "更改账单邮箱地址",
    "spaceSubscriptionBilling.changeBillingInterval.helpButton.label":
      "了解此设置将如何影响你的帳单。",
    "spaceSubscriptionBilling.changeBillingInterval.title": "更改账单间隔",
    "spaceSubscriptionBilling.changePaymentMethod.changeCardButton.label":
      "更换卡片",
    "spaceSubscriptionBilling.changeVATIDModal.subtitle":
      "请包括你的国家/地区代码",
    "spaceSubscriptionBilling.changeVATIDModal.title":
      "更改增值税/商品及服务税编号",
    "spaceSubscriptionBilling.changeYourAddressModal.title": "更改你的地址",
    "spaceSubscriptionBilling.discount.percentOff": "{percentOff}% 的折扣",
    "spaceSubscriptionBilling.invoicesSection.invoiceStatus.credited": "已退款",
    "spaceSubscriptionBilling.invoicesSection.invoiceStatus.due": "已到期",
    "spaceSubscriptionBilling.invoicesSection.invoiceStatus.failed": "失败",
    "spaceSubscriptionBilling.invoicesSection.invoiceStatus.paid": "已付费",
    "spaceSubscriptionBilling.invoicesSection.loadMoreInvoicesButton.label":
      "加载更多",
    "spaceSubscriptionBilling.invoicesSection.noInvoicesMessage":
      "此工作区尚未付款。",
    "spaceSubscriptionBilling.invoicesSection.title": "发票",
    "spaceSubscriptionBilling.invoicesSection.viewInvoiceButton": "查看发票",
    "spaceSubscriptionBilling.offline.message": "请连接网络后管理账单。",
    "spaceSubscriptionBilling.setBillingInterval.monthlyOption": "月付",
    "spaceSubscriptionBilling.setBillingInterval.pricePerMonth":
      "每月 {monthlyPrice}",
    "spaceSubscriptionBilling.setBillingInterval.pricePerMonth.perMember":
      "每人每月 {monthlyPrice}",
    "spaceSubscriptionBilling.setBillingInterval.yearlyOption":
      "年付・可节省 {yearlySavingsPercent}",
    "spaceSubscriptionBilling.setPaymentMethod.payWithCardOption": "用卡片付款",
    "spaceSubscriptionBilling.setPaymentMethod.payWithCardOption.description":
      "信用卡或借记卡",
    "spaceSubscriptionBilling.subscriptionSettingsSection.VATID.title":
      "增值税/商品及服务税编号",
    "spaceSubscriptionBilling.subscriptionSettingsSection.applyCoupon.title":
      "使用优惠券",
    "spaceSubscriptionBilling.subscriptionSettingsSection.billingEmail.title":
      "账单邮箱地址",
    "spaceSubscriptionBilling.subscriptionSettingsSection.billingInterval.title":
      "账单间隔",
    "spaceSubscriptionBilling.subscriptionSettingsSection.billingInterval.value.monthly":
      "每月",
    "spaceSubscriptionBilling.subscriptionSettingsSection.billingInterval.value.yearly":
      "每年",
    "spaceSubscriptionBilling.subscriptionSettingsSection.businessPlanTitle":
      "商业版",
    "spaceSubscriptionBilling.subscriptionSettingsSection.changePlanButton.label":
      "更改方案",
    "spaceSubscriptionBilling.subscriptionSettingsSection.discount.title":
      "折扣",
    "spaceSubscriptionBilling.subscriptionSettingsSection.enterprisePlanTitle":
      "企业版",
    "spaceSubscriptionBilling.subscriptionSettingsSection.legacyPlanTitle":
      "旧定价方案",
    "spaceSubscriptionBilling.subscriptionSettingsSection.paymentMethod.title":
      "付款方式",
    "spaceSubscriptionBilling.subscriptionSettingsSection.paymentMethod.value.achOrWireTransfer":
      "ACH 或电汇",
    "spaceSubscriptionBilling.subscriptionSettingsSection.paymentMethod.value.creditCard":
      "尾数为 {lastFourDigits} 的 {creditCardBrand} 卡",
    "spaceSubscriptionBilling.subscriptionSettingsSection.paymentMethod.value.none":
      "无",
    "spaceSubscriptionBilling.subscriptionSettingsSection.personalEducationPlanTitle":
      "个人专业版（教育）",
    "spaceSubscriptionBilling.subscriptionSettingsSection.personalPlanTitle":
      "个人专业版",
    "spaceSubscriptionBilling.subscriptionSettingsSection.restartSubscriptionButton.label":
      "重新订阅",
    "spaceSubscriptionBilling.subscriptionSettingsSection.teamPlanTitle":
      "团队版",
    "spaceSubscriptionBilling.subscriptionSettingsSection.workspaceSubscriptionBalance.title":
      "工作区余额",
    "spaceSubscriptionBilling.subscriptionSettingsSection.yourAddress.title":
      "地址",
    "spaceSubscriptionBilling.updateButton.label": "更新",
    "spaceSubscriptionBilling.useCreditModal.amountOfCreditQuestion":
      "你想在下一张发票使用多少积分？",
    "spaceSubscriptionBilling.useCreditModal.applyCreditButton.label":
      "使用积分",
    "spaceSubscriptionBilling.useCreditModal.cancelButton.label": "取消",
    "spaceSubscriptionBilling.useCreditModal.nextInvoiceAmount": "下张发票总额",
    "spaceSubscriptionBilling.useCreditModal.title":
      "使用 Notion 积分・{creditInDollars} 可用",
    "spaceSubscriptionBilling.useCreditModal.warning":
      "使用积分到你的帐户后<bold>不能撤消</bold>。",
    "spaceSubscriptionBilling.vatCountryCode.subtitle":
      "请包括你的国家/地区代码",
    "spaceSubscriptionBilling.vatId.missingCountry":
      "要更新你的增值税/商品及服务税编号，请更新你的账单地址。",
    "spaceSubscriptionBilling.vatId.vatNotRequired":
      "你的税务管辖区不需要增值税/商品及服务税编号。",
    "spaceSubscriptionBillingInfoForm.countryDropdown.title":
      "选择一个国家或地区",
    "spaceSubscriptionPaymentForm.billingInformation.address": "地址",
    "spaceSubscriptionPaymentForm.billingInformation.businessName":
      "企业名称（可选）",
    "spaceSubscriptionPaymentForm.billingInformation.city": "城市",
    "spaceSubscriptionPaymentForm.billingInformation.country": "国家或地区",
    "spaceSubscriptionPaymentForm.billingInformation.fullName": "全名",
    "spaceSubscriptionPaymentForm.billingInformation.header": "账单信息",
    "spaceSubscriptionPaymentForm.billingInformation.state": "州或省",
    "spaceSubscriptionPaymentForm.billingInformation.zipCode": "邮政编码",
    "spaceSubscriptionPaymentForm.paymentInformation.header": "付款信息",
    "spaceSubscriptionPaymentForm.vatCountryCode.header": "增值税（可选）",
    "spaceSubscriptionPaymentForm.vatCountryCode.placeholder":
      "增值税/商品及服务税编号",
    "spaceSubscriptionPlans.faqSection.title": "常见问题",
    "spaceSubscriptionPlans.offlineMessage": "请连接网络后设置定价方案。",
    "spaceSubscriptionPlans.priceDisclaimer":
      "显示的为年付方案价格。若选择月付，<b>个人专业版</b>为每月 {personalMonthlyPrice}，<b>团队版</b>为每位成员每月 {teamMonthlyPrice}，而<b>企业版</b>为每位成员每月 {enterpriseMonthlyPrice}。",
    "spaceSubscriptionPlans.studentsAndEducatorsSection.getEducationPlanButton.label":
      "获取免费教育版",
    "spaceSubscriptionPlans.studentsAndEducatorsSection.text":
      "<p>个人专业版对学生和教育工作者是免费的！只需使用你的学校的邮箱地址注册即可立即使用这些功能。</p><p>如果你已经在使用个人专业版，请将与你帐户关联的电子邮件更改为学校的邮箱地址以免费获取。</p>",
    "spaceSubscriptionPlans.studentsAndEducatorsSection.title":
      "学生与教育工作者",
    "spaceSubscriptionPlans.teamPlan.confirmButtonLabel":
      "{upgrading, select, true {升级到团队版} other {降级到团队版}}",
    "spaceSubscriptionPlans.teamPlan.confirmMessage":
      "你将以每位成员每月{price}的价格订阅 Notion 团队版。{br}系统将在扣除帐户余额后，按比例向你收取费用。",
    "spaceSubscriptionSettings.upgradeModal.billingIntervalSection.header":
      "账单间隔",
    "spaceSubscriptionSettings.upgradeModal.checkEmailDialog.message":
      "请检查你的电子邮件以获取发票。",
    "spaceSubscriptionSettings.upgradeModal.contactSales": "联系销售",
    "spaceSubscriptionSettings.upgradeModal.paymentMethodSection.header":
      "付款方式",
    "spaceSubscriptionSettings.upgradeModal.sales.questions":
      "有问题？请联系我们的销售团队了解更多信息。",
    "spaceSubscriptionUpdatePaymentMethod.applePay.total.label":
      "Notion - 我们会定期向你收取费用",
    "spaceSubscriptionUpdatePaymentMethod.creditCard.update.header":
      "更新信用卡",
    "spaceSubscriptionUpdatePaymentMethod.creditCard.updateButton": "更新",
    "spaceSubscriptionUpdatePaymentMethod.update.header": "更新付款方式",
    "spaceSubscriptionUpgradeModal.applePay.total.label":
      "Notion - 我们会定期向你收取费用",
    "spaceSubscriptionUpgradeModal.billingAddress.invalidError":
      "你的地址无效。请更新你的地址，以便我们能够处理你的付款。",
    "spaceSubscriptionUpgradeModal.billingAddress.missingCountryError":
      "无效的国家/地区。请从下拉菜单中选择国家/地区。",
    "spaceSubscriptionUpgradeModal.creditCard.genericError":
      "无法处理你的卡片。请再试一次。",
    "spaceSubscriptionUpgradeModal.orderSummary.businessPlan":
      "商业版 ({numberOfMembers, plural, one {# 位成员} other {# 位成员}})",
    "spaceSubscriptionUpgradeModal.orderSummary.enterprisePlan":
      "企业版 ({numberOfMembers, plural, one {# 位成员} other {# 位成员}})",
    "spaceSubscriptionUpgradeModal.orderSummary.header": "订单摘要",
    "spaceSubscriptionUpgradeModal.orderSummary.personalPlan": "个人专业版",
    "spaceSubscriptionUpgradeModal.orderSummary.planSubtitle.billedMonthly":
      "{price} /用户/月 · 按月计费",
    "spaceSubscriptionUpgradeModal.orderSummary.planSubtitle.billedYearly":
      "{price} /用户/月 · 年付",
    "spaceSubscriptionUpgradeModal.orderSummary.teamPlan":
      "团队版 ({numberOfMembers, plural, one {# 位成员} other {# 位成员}})",
    "spaceSubscriptionUpgradeModal.upgradeButton.enterprisePlan":
      "升级到企业版",
    "spaceSubscriptionUpgradeModal.upgradeButton.personalProPlan":
      "升级到个人专业版",
    "spaceSubscriptionUpgradeModal.upgradeButton.teamPlan": "升级到团队版",
    "spaceSubscriptionUpgradeOrderSummary.orderTotal": "总额",
    "spaceSubscriptionUpgradePlanFeatures.blockLimit.description":
      "前 1,000 个块",
    "spaceSubscriptionUpgradePlanFeatures.blockLimit.title": "免费",
    "spaceSubscriptionUpgradePlanFeatures.blockLimit.tooltip":
      "块是你添加到页面的内容，例如文本段落或待办事项。{br}团队试用版不提供付费团队版中的某些功能。",
    "startupCouponInlineLink.text": "您是初创公司吗？",
    "stripeHelpers.cardDeclined.error.message": "你的卡被拒绝。",
    "stripeHelpers.cardDeclined.error.message.declinedFunds":
      "您的卡被拒绝，因为账户余额不足。",
    "stripeHelpers.cardDeclined.error.message.expiredCard":
      "您的卡被拒绝，因为该卡已过期。",
    "stripeHelpers.cardDeclined.error.message.incorrectNumber":
      "您的卡被拒绝，因为输入的卡号错误。",
    "stripeHelpers.cardDeclined.error.message.invalidAmount":
      "您的卡被拒绝，因为付款金额超过了允许的金额。",
    "stripeHelpers.cardDeclined.error.message.invalidCvc":
      "您的卡被拒绝，因为您输入的 CVC 码无效",
    "stripeHelpers.invalidCVC.error.message": "你的卡的安全码无效。",
    "stripeHelpers.invalidExpiryYear.error.message":
      "你的卡的到期年份是过去的年份。",
    "stripeHelpers.invalidNumber.error.message":
      "你的卡号不是有效的信用卡号码。",
    "studentNotEligibleModal.contactUsSection.message":
      "对此有疑问？<inlinelink>更多信息和常见问题解答</inlinelink>。",
    "studentNotEligibleModal.header":
      "<p>你当前使用的邮箱地址没有资格享受免费的个人专业版。</p><p>K-12 学生、K-12 教育工作者以及使用 Gmail、Outlook 等个人邮箱地址的用户没有资格免费获取<pricinglink>个人专业版</pricinglink>，但任何人都可以使用免费的<pricinglink>个人版</pricinglink>享受无限存储空间。</p>",
    "studentNotEligibleModal.numberedList.changeEmailItem.button.label":
      "更改邮箱地址",
    "studentNotEligibleModal.numberedList.changeEmailItem.message":
      "你当前的邮箱地址是：",
    "studentNotEligibleModal.numberedList.changeEmailItem.message2":
      "成千上万的大学、学院、中学后教育机构的域名已具备资格，而不仅是 .edu 结尾的邮箱地址。",
    "studentNotEligibleModal.numberedList.firstItem": "1.",
    "studentNotEligibleModal.numberedList.item2.promocode.errorMessage":
      "促销代码 {code} 不存在",
    "studentNotEligibleModal.numberedList.item2.promocodePlaceholder":
      "输入教育优惠码…",
    "studentNotEligibleModal.numberedList.promoCodeItem.message":
      "有教育优惠码？",
    "studentNotEligibleModal.numberedList.promoCodeItem.submitButton": "提交",
    "studentNotEligibleModal.numberedList.secondItem": "2.",
    "subheaderBlock.placeholder": "标题 2",
    "subscriptSettings.freePersonal.downgradeTitle": "降级到个人版？",
    "subscriptionActions.overFreeBlockLimit.longMessage":
      "你已超过免费版的块限制",
    "subscriptionActions.overFreeBlockLimit.shortMessage": "你已超过块限制",
    "subscriptionActions.upgradeForUnlimitedBlocks.longMessage":
      "升级以无限使用",
    "subscriptionActions.upgradeForUnlimitedBlocks.shortMessage": "升级",
    "subscriptionErrors.cardRequiredError":
      "由于你尚未支付上次的账单，因此必须使用卡片支付。",
    "subscriptionErrors.collectionMethodNotAllowed":
      "你无法在应用中选择此收款方式。请联系支持人员。",
    "subscriptionErrors.couponAlreadyApplied": "这是已经使用的优惠券。",
    "subscriptionErrors.creditExceedsBalanceError":
      "无法使用超过 {maxCredits} 的积分余额。",
    "subscriptionErrors.creditNoFreeLunch": "负积分是不可能的。",
    "subscriptionErrors.invalidCreditError": "此积分额度不可用。",
    "subscriptionErrors.invalidPlan": "你选择的方案不可用。",
    "subscriptionErrors.invalidVatError": "不是有效的商业登记号(VAT号)。",
    "subscriptionErrors.missingAddressError": "地址行1必须存在。",
    "subscriptionErrors.missingNameError": "名称必须存在。",
    "subscriptionErrors.paymentMethodNotAllowed":
      "你的帐户不符合此付款方式的条件。",
    "subscriptionErrors.personalPlanMoreThanOneMember":
      "个人版使用时，你的工作区内只能有一位成员。",
    "subscriptionHelpers.billingInterval.monthly.option.title":
      "月付 – 每人每月 {memberPrice}",
    "subscriptionHelpers.billingInterval.monthly.title": "月付",
    "subscriptionHelpers.billingInterval.yearly.option.title":
      "<pre>年付 – 每人每月 {memberPrice} <span>节省 {yearlySavingsPercent}</span></pre>",
    "subscriptionHelpers.billingInterval.yearly.title":
      "<pre>年付・<span>省 {yearlySavingsPercent}</span></pre>",
    "subscriptionHelpers.lineItems.balance": "余额",
    "subscriptionHelpers.lineItems.credit": "积分",
    "subscriptionHelpers.lineItems.promo": "优惠券",
    "subscriptionHelpers.lineItems.promo.subtitle":
      "有效期为 {expirationInMonths} 个月",
    "subscriptionHelpers.lineItems.subTotal": "小计",
    "subscriptionHelpers.lineItems.tax.subtitle": "如果适用",
    "subscriptionHelpers.lineItems.tax.title": "税",
    "subscriptionHelpers.paymentMethod.appleOrGooglePay.title":
      "Apple 或 Google Pay",
    "subscriptionHelpers.paymentMethod.creditCard.title": "信用卡或借记卡",
    "subscriptionHelpers.paymentMethod.invoice.caption": "通过电子邮件接收发票",
    "subscriptionHelpers.paymentMethod.invoice.title": "ACH 或电汇",
    "subscriptionHelpers.pricePerMonthPricing.label": "每月 {price}",
    "subscriptionHelpers.pricePerUserPerMonthPricing.label": "每人每月 {price}",
    "subscriptionSettings.button": "管理订阅",
    "subscriptionSettings.description":
      "你目前通过 Apple 的应用内购买进行订阅。你可以在 Apple 的订阅设置中管理你的订阅。",
    "subscriptionSettings.downgradeToBusinessDialog.confirmationButton":
      "降级到商业版",
    "subscriptionSettings.freePersonal.downgradeConfirmationButton":
      "降级到个人版",
    "subscriptionSettings.freePersonal.downgradeMessage":
      "个人版仅供1人免费使用。你将失去添加成员的能力，并且每个工作区的访客将限制为 5 个。",
    "subscriptionSettings.freeTeam.upgradeMessage":
      "你将获得付费团队版的大多数功能，块存储限制为 1,000 个。你可以随时升级以解除限制。",
    "subscriptionSettings.freeTeam.upgradeTitle": "免费试用团队版",
    "subscriptionSettings.invalidPromoCodeError.message": "此促销代码无效。",
    "subscriptionSettings.mobileDescription":
      "通过 App Store 管理你的个人专业版订阅。",
    "subscriptionSettings.personalFreeMessage":
      "你现在免费订阅了 Notion 的个人专业版。",
    "subscriptionSettings.startTeamTrialDialog.confirmationbutton":
      "开始团队版试用",
    "subscriptionSettings.subscriptionNextChargeMessage.businessPlan":
      "{planInterval, select, month {此工作区的商业版方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate} 续订。} other {此工作区的商业版方案已设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate} 续订。}}",
    "subscriptionSettings.subscriptionNextChargeMessage.enterprisePlan":
      "{planInterval, select, month {此工作区的企业版方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate}续订。} other {此工作区的企业版方案设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate}续订。}}",
    "subscriptionSettings.subscriptionNextChargeMessage.legacyPlan":
      "{planInterval, select, month {此工作区的旧定价方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate}续订。} other {此工作区的旧定价方案设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate}续订。}}",
    "subscriptionSettings.subscriptionNextChargeMessage.personalEducationPlan":
      "{planInterval, select, month {此工作区的个人专业版（教育）方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate}续订。} other {此工作区的个人专业版（教育）方案已设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate}续订。}}",
    "subscriptionSettings.subscriptionNextChargeMessage.personalPlan":
      "{planInterval, select, month {此工作区的个人专业版方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate}续订。} other {此工作区的个人专业版方案已设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate}续订。}}",
    "subscriptionSettings.subscriptionNextChargeMessage.teamPlan":
      "{planInterval, select, month {此工作区的团队版方案已设定为<bold>每月 {planCharge}</bold>，并将于 {renewalDate}续订。} other {此工作区的团队版方案已设定为<bold>每年 {planCharge}</bold>，并将于 {renewalDate}续订。}}",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.businessPlan":
      "此工作区的<bold>商业版</bold>方案已于 {cancellationDate} 取消，并将于 {expirationDate} 到期。",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.enterprisePlan":
      "此工作区的<bold>企业版</bold>方案已于 {cancellationDate}取消，并将于 {expirationDate}到期。",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.legacyPla":
      "此工作区的<bold>旧定价方案</bold>已于 {cancellationDate}取消，并将于 {expirationDate}到期。",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.personalEducationPlan":
      "此工作区的<bold>个人专业教育版</bold>方案已于{cancellationDate}取消，并将于 {expirationDate}到期。",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.personalPlan":
      "此工作区的<bold>个人专业版</bold>方案已于 {cancellationDate}取消，并将于 {expirationDate}到期。",
    "subscriptionSettings.subscriptionStatus.cancellationMessage.teamPlan":
      "此工作区的<bold>团队版</bold>方案已于 {cancellationDate}取消，并将于 {expirationDate}到期。",
    "subscriptionSettings.subscriptionStatus.legacySubscriptionMessage":
      "我们的订阅系统目前正在迁移中。请稍后再查看以了解新功能！",
    "subscriptionSettings.subscriptionStatus.nextPlan.personal":
      "当前方案到期后，此工作区将降级为个人版。",
    "subscriptionSettings.subscriptionStatus.nextPlan.team":
      "当前方案过期后，此工作区将降级为免费试用的团队版，块存储限制为 1,000 个。",
    "subscriptionSettings.subscriptionStatus.personalFreeUpgradeMessage":
      "此工作区为<bold>个人版</bold>。升级以使用 Notion 与更多人进行协作。",
    "subscriptionSettings.subscriptionStatus.proratedChargeMessage":
      "你将于 {upcomingChargeDate}按比例支付 {formattedInvoiceNextCharge}。",
    "subscriptionSettings.subscriptionStatus.reachedFreeBlockLimit":
      "此工作区使用了 {freeBlockLimit} 个块存储限制中的 {usedBlocks} 个块（占总存储的 {utilizationPercentage}）。",
    "subscriptionSettings.subscriptionStatus.remainingChargeMessage":
      "根据你的帐户余额进行调整后，你将需要支付 {formattedInvoiceNextCharge} 费用。",
    "subscriptionSettings.subscriptionStatus.teamTrialMessage":
      "此工作区是<bold>团队版</bold>的免费试用版，有块存储限制。",
    "subscriptionSettings.subscriptionStatus.upcomingInvoiceLink":
      "<upcominginvoicelink>查看下个发票</upcominginvoicelink>",
    "subscriptionSettings.title": "订阅",
    "subscriptionSettings.updatingSubscriptionMessage": "正在更新订阅…",
    "subscriptionSettings.upgradeToBusinessDialog.confirmationButton":
      "升级到商业版",
    "subscriptionSettings.upgradeToBusinessDialog.message":
      "你将以每位成员每月 {price} 的价格订阅 Notion 商业版。{br}系统将在扣除帐户余额后，按比例向你收取费用。",
    "subscriptionSettings.upgradeToEnterpriseDialog.confirmationbutton":
      "升级到企业版",
    "subscriptionSettings.upgradeToEnterpriseDialog.message":
      "你将以每位成员每月{price}的价格订阅 Notion 企业版。{br}系统将在扣除帐户余额后，按比例向你收取费用。",
    "subscriptionSettings.verifyingEligibilityMessage": "正在验证资格…",
    "subscriptionUpgradeDetails.features":
      "<span>{planName}的所有功能，</span>以及：",
    "subscriptionUpgradeDetails.learnMore": "了解更多",
    "subscriptionUpgradeDetails.oneLiner.enterprise":
      "运转公司所需的控制和支持。",
    "subscriptionUpgradeDetails.oneLiner.personal": "给想要更多的高级玩家。",
    "subscriptionUpgradeDetails.oneLiner.team":
      "让团队在一个地方写作、计划与合作。",
    "subscriptionUpgradeDetails.perMonthPricing.label": "每月",
    "subscriptionUpgradeDetails.perUserPerMonthPricing.label": "每人{br}每月",
    "subscriptionUpgradeDetails.planName.free": "个人版",
    "subscriptionUpgradeDetails.planName.personal": "专业版",
    "subscriptionUpgradeDetails.planName.team": "团队版",
    "subscriptionUpgradeDetails.planName.teamTrial": "团队试用版",
    "subscriptionUpgradeDetails.price": "{price}",
    "subscriptionUpgradeDetails.title.enterprise": "升级到企业版",
    "subscriptionUpgradeDetails.title.personal": "升级到个人专业版",
    "subscriptionUpgradeDetails.title.team": "升级到团队版",
    "subscriptionUpgradeDetails.title.teamFree": "升级到团队试用版",
    "subscriptionUpgradeModal.oneLiner.enterprise":
      "运营公司所需的控制和支持。",
    "subscriptionUpgradeModal.oneLiner.personal":
      "适用于想要执行更多操作的高级用户。",
    "subscriptionUpgradeModal.oneLiner.team": "在一个地方写作、计划与合作。",
    "subscriptionUpgradeModal.title.enterprise": "升级到企业版",
    "subscriptionUpgradeModal.title.personal": "升级到个人专业版",
    "subscriptionUpgradeModal.title.team": "升级到团队版",
    "subscriptionUpgradeModal.title.teamFree": "升级到团队试用版",
    "subscriptionUpgradeModal.upgradeToBusinessDialog.businessPlan":
      "升级到商业版",
    "subsubheaderBlock.placeholder": "标题 3",
    "synced.lastSyncedAt.label": "同步时间为 {lastSyncedAt}",
    "synced.partial_sync.label": "部分同步",
    "synced.syncing.label": "正在同步",
    "syncedCollectionIndicators.calendar.label": "日历",
    "syncedCollectionIndicators.issues.label": "问题",
    "syncedCollectionIndicators.originalUrl": "链接到原始 url",
    "syncedCollectionIndicators.originalUrlWithIntegration":
      "{integrationName} 中的 {collectionType}",
    "syncedCollectionIndicators.project.label": "项目",
    "syncedCollectionIndicators.pullRequests.label": "拉取请求",
    "syncedCollectionIndicators.releases.label": "发布",
    "tabBlock.emptyBlock.placeholderText": "空选项卡。点击或拖动块到这里。",
    "tabBlockActions.addTab.title": "新选项卡",
    "tabMenuBlock.title.placeholder": "无标题",
    "tableOfContentsBlock.mobileActionMenu.button.label": "更多动作…",
    "tableOfContentsBlock.placeholder":
      "添加标题块以创建目录。<linktohelpbutton>了解更多</linktohelpbutton>。",
    "tableView.selectionOverlay.dragAndFill.tooltip": "上下拖动以输入值。",
    "teamAccessLevel.selectLabel.privateUpgradeToBusinessTooltip":
      "升级到商业版以设置为私人",
    "teamAccessLevel.selectLabel.privateUpgradeToEnterpriseTooltip":
      "升级到企业版以设置为私人",
    "teamActions.archiveTeam.confirmDialogAcceptLabel": "归档团队空间",
    "teamActions.archiveTeam.confirmDialogDescription":
      "归档此团队空间会将其从所有团队空间成员的侧边栏中移除。请输入团队空间名称进行确认。",
    "teamActions.archiveTeam.confirmDialogTitle": "是否确定要归档此团队空间？",
    "teamActions.confirmMoveFromTeam.description":
      "这将把 {numPagesMoved, plural, one {此页面} other {这些页面}} 上的权限转移至 {moveToTeamName} 的成员。",
    "teamActions.confirmMoveToTeam.acceptLabel": "确认",
    "teamActions.confirmMoveToTeam.removeRestrictedDescription":
      "{numPagesMoved, plural, one {此页面} other {这些页面}} 将不再具有受限访问权限。",
    "teamActions.confirmMoveToTeam.title":
      "你确定要将 {numPagesMoved, plural, one {此页面} other {这些页面}} 移动至 {moveToTeamName}？",
    "teamActions.confirmTeamAccessChangeDialog.acceptLabel": "确认",
    "teamActions.confirmTeamAccessChangeDialog.closedTeam.titleWithName":
      "确定要将 {teamName} 设为封闭式团队吗？",
    "teamActions.confirmTeamAccessChangeDialog.openTeam.title":
      "确定要将此团队设为开放式团队吗？",
    "teamActions.confirmTeamAccessChangeDialog.openTeam.titleWithName":
      "确定要将 {teamName} 设为开放式团队吗？",
    "teamActions.confirmTeamAccessChangeDialog.privateTeam.title":
      "确定要将此团队设为私人团队吗？",
    "teamActions.confirmTeamAccessChangeDialog.privateTeam.titleWithName":
      "确定要将 {teamName} 设为私人团队吗？",
    "teamActions.confirmTeamAccessDialog.disableDefaultTeamLabel":
      "这还将禁用默认团队并停止将团队成员资格与工作区同步。",
    "teamActions.createTeamFromPage.emptyTitle":
      "无法将没有标题的页面转换为团队空间。",
    "teamActions.leaveTeam.confirmDialogAcceptLabel": "移除",
    "teamActions.leaveTeam.confirmDialogAcceptLabel.removingYourself":
      "离开团队空间",
    "teamActions.leaveTeam.confirmDialogCancelLabel.removingSomeoneElse":
      "取消",
    "teamActions.leaveTeam.confirmDialogDescription.removingSomeoneElse":
      "此更改不会应用于团队空间中的任何受限页面。",
    "teamActions.leaveTeam.confirmDialogDescription.removingYourself":
      "你在侧边栏中将再也看不到此团队空间。",
    "teamActions.leaveTeam.confirmDialogMessage.removingSomeoneElse":
      "是否确定要从 {teamName} 中移除 {memberName}？",
    "teamActions.leaveTeam.confirmDialogMessage.removingYourself":
      "是否确定要退出 {teamName}？此团队空间将不再显示在你的侧边栏中，并且你可能会失去权限。",
    "teamActions.leaveTeam.onlyTeamMemberLeftDialogMessage":
      "你不能离开此团队空间，因为你是唯一的团队空间所有者。请邀请其他团队空间所有者加入，你才能离开此团队空间。",
    "teamActions.leaveTeam.partOfGroupDialog.removingSomeoneElse":
      "你无法从 {teamName} 中移除 {memberName}，因为他们是通过工作区管理员管理的群组添加到此团队的。",
    "teamActions.leaveTeam.partOfGroupDialog.removingYourself":
      "你不能离开 {teamName}，因为你是通过工作区管理员管理的群组添加到此团队的。",
    "teamActions.leaveTeam.userMembershipFromGroupDialogMessage":
      "无法离开此团队空间，因为它是{groupNames}的成员。",
    "teamActions.teamScreen.closedTeam.description":
      "工作区中的任何人都可以查看团队空间并分享内容，但无法加入。",
    "teamActions.teamScreen.openTeam.description":
      "工作区中的每个人都可以访问团队及其内容。",
    "teamActions.teamScreen.privateTeam.description":
      "只有成员才能查看团队及其内容。",
    "teamBrowser.teamCard.Membership": "成员",
    "teamBrowser.teamCard.MembershipPlural": "成员",
    "teamBrowser.teamCard.button.joined": "已加入",
    "teamBrowser.teamCard.leaveTeam.defaultTeamTooltip":
      "你不能离开此团队空间，因为它已与整个组织同步。",
    "teamBrowser.teamCard.leaveTeam.groupTooltip":
      "由于你是 {groupNames} 的成员，所以不能离开此团队空间。",
    "teamBrowser.teamCard.leaveTeam.groupTooltipNonAdmin":
      "你无法离开此团队空间，因为你是由工作区管理员管理的群组的成员。",
    "teamBrowserOutliner.createTeamspaceButton": "新建团队空间",
    "teamBrowserOutliner.joinedTeamsLabel": "你的团队空间",
    "teamBrowserOutliner.joinedTeamsSection.tooltip": "你加入的团队空间",
    "teamBrowserOutliner.noFilterResults.description":
      "重试或<linkbutton>清除搜索</linkbutton>",
    "teamBrowserOutliner.noFilterResults.title": "无结果",
    "teamBrowserOutliner.noUnjoinedTeams": "没有可加入的团队空间",
    "teamBrowserOutliner.searchResultsLabel": "搜索结果",
    "teamBrowserOutliner.unjoinedTeamsLabel": "更多团队空间",
    "teamBrowserOutliner.unjoinedTeamsSection.tooltip": "你可以加入的团队空间",
    "teamHelpers.generalTeam.name": "一般",
    "teamJoinLeaveButton.joinTeam.closedTeamTooltip":
      "成员必须邀请才能参与私人团队空间。",
    "teamJoinLeaveButton.leaveTeam.enabledTooltip": "点击退出团队空间。",
    "teamJoinLeaveButton.leaveTeam.onlyOwnerTooltip":
      "你不能离开此团队空间，因为你是唯一的团队空间所有者。请邀请其他所有者进入，你才能离开。",
    "teamMemberOwnerSelect.removeMember.confirmation.message":
      "确定要从团队中移除 {memberName}？",
    "teamMemberOwnerSelect.removeMember.confirmation.messageWithTeamName":
      "确定要从 {teamName} 中移除 {memberName}？",
    "teamMemberPermissionRoleSelect.member.permissionItem.defaultDescription":
      "为成员提供比团队空间默认设置更多的权限。",
    "teamMemberPermissionRoleSelect.member.permissionItem.overrideDescription":
      "此成员具有比团队空间默认设置更多的权限。",
    "teamMemberPermissionRoleSelect.member.permissionItem.restoreButton":
      "恢复为团队空间默认设置",
    "teamMemberPermissionRoleSelect.member.permissionitem.description":
      "你不能授予比团队空间默认设置更低的访问权限。请降低团队空间成员的访问权限以启用此选项。",
    "teamMemberPermissionRoleSelect.permissionItem.defaultTag": "默认",
    "teamMemberPermissionRoleSelect.permissionOverride.buttonTooltip":
      "为此团队空间中的所有页面设置自定义权限级别",
    "teamMemberPermissionRoleSelect.permissionOverride.menuHeader":
      "选择自定义角色",
    "teamMemberPermissionSettings.permissionSwitcher.accept": "更改访问权限",
    "teamMemberPermissionSettings.permissionSwitcher.confirmation.description":
      "此更改不会应用于团队空间中的任何受限页面。",
    "teamMemberPermissionSettings.permissionSwitcher.confirmation.message":
      "是否确定要将 {name} 的角色更改为 {role}？",
    "teamMemberPermissionSettings.removeSelfTeamOwner.confirmation.message":
      "是否确定要移除自己的团队空间所有者身份？你将无法再编辑团队空间设置和权限。",
    "teamMemberPermissionSettings.removeTeamOwner.confirmation.message":
      "是否确定要移除团队空间所有者 {name}？他们将无法再编辑团队空间设置和权限。",
    "teamMembersList.tooltip.overflowMessage":
      "还有 {countRemainingUsers} 个用户…",
    "teamMenuHeader.teamMemberCount":
      "{numberOfMembers, plural, other {{numberOfMembers} 位成员}}",
    "teamOutliner.addPage": "添加页面",
    "teamOutliner.emptyMessage": "没有固定页面",
    "teamOutliner.noOverflowEmptyMessage": "没有页面",
    "teamPermissionRow.group.tooltip": "添加者",
    "teamPermissionSettings.closeSpacePermissionItem.description":
      "此设置已关闭，因此只有 {num} 位团队成员具有访问权限。",
    "teamPermissionSettings.generalSection.spacePermission": "默认访问权限",
    "teamPermissionSettings.generalSection.teamPermission": "团队成员",
    "teamPermissionSettings.group": "组",
    "teamPermissionSettings.member.showMore": "显示其他 {numNotShown} 个",
    "teamPermissionSettings.numberOfMembers":
      "{groupSize, plural, one {{groupSize} 位成员} other {{groupSize} 位成员}}",
    "teamPermissionSettings.openSpacePermissionItem.description":
      "{num, plural, one {{num} 位工作区成员} other {{num} 位工作区成员}}",
    "teamPermissionSettings.teamPermissionItem.description":
      "{num, plural, one {{num} 位团队成员} other {{num} 位团队成员}}",
    "teamPermissionSettings.unknownGroup": "未知群组",
    "teamPermissionsActions.archivedTeam": "已归档 {teamName}",
    "teamPermissionsActions.joinedTeam": "已加入 {teamName}",
    "teamPermissionsActions.leftTeam": "已离开 {teamName}",
    "teamPermissionsActions.leftTeamNoName": "已离开团队",
    "teamPermissionsActions.restoredTeam": "已恢复 {teamName}",
    "teamPermissionsActions.restoredTeamNoName": "已恢复团队",
    "teamPermissionsInviteOverlay.inviteModal.addNMembers":
      "{numMembers, plural, other {添加 {numMembers} 个成员}}",
    "teamPermissionsInviteOverlay.inviteModal.addNMembers.groupsAsOwnersTooltip":
      "无法将组添加为团队空间所有者。请删除所有组以继续。",
    "teamPermissionsInviteOverlay.inviteModal.addNOwners":
      "{numMembers, plural, other {添加 {numMembers} 名所有者}}",
    "teamPermissionsInviteOverlay.inviteModal.done": "完成",
    "teamPermissionsInviteOverlay.inviteModal.inviteNMembers":
      "{numMembers, plural, other {邀请 {numMembers} 个成员}}",
    "teamPermissionsInviteOverlay.inviteModal.inviteNOwners":
      "{numMembers, plural, other {邀请 {numMembers} 名所有者}}",
    "teamPermissionsInviteOverlay.inviteModal.skipForNow": "暂时跳过",
    "teamPermissionsInviteWithModal.addMembers.tooltip": "添加成员和组",
    "teamPermissionsInviteWithModal.addMembersNoPermissions.tooltip":
      "你没有将成员添加到此团队空间的权限",
    "teamPermissionsInviteWithModal.addMembersToDefaultTeam.tooltip":
      "你无法添加成员，因为所有工作区成员都已与此默认团队空间同步",
    "teamPermissionsInviteWithModal.filterGroupsAndMembersInput.placeholder":
      "搜索成员或群组...",
    "teamPermissionsInviteWithModal.filterMembersInput.placeholder":
      "按邮箱地址或姓名筛选…",
    "teamPermissionsInviteWithModal.openModal": "添加成员",
    "teamPermissionsMenu.memberItem.caption":
      "不能编辑团队空间设置，但可以访问团队空间页面。",
    "teamPermissionsMenu.memberItem.label": "成员",
    "teamPermissionsMenu.ownerItem.caption":
      "可以编辑团队空间设置，并且拥有团队空间页面的完全访问权限。",
    "teamPermissionsMenu.ownerItem.label": "团队空间所有者",
    "teamPermissionsSettings.closeTeamToOpen.accept": "向所有人授予访问权限",
    "teamPermissionsSettings.closeTeamToOpen.dialogDescription":
      "确定要向工作区中的所有人授予对此团队中页面的访问权限？",
    "teamPermissionsSettings.closedTeam.noAccessLabel": "无访问权限",
    "teamPermissionsSettings.openTeamToClose.accept": "移除访问权限",
    "teamPermissionsSettings.openTeamToClose.dialogDescription":
      "确定要删除工作区中所有人的访问权限？只有团队成员才具有访问权限，新成员必须通过邀请加入。",
    "teamPermissionsSettings.privateTeam.noAccessLabel": "无访问权限",
    "teamPermissionsSettings.privateTeam.noAccessTooltip":
      "当团队为私有团队时，无法与工作区共享页面",
    "teamPermissionsSettings.teamspace.disabledPermissionitem.description":
      "团队空间级别权限不能低于默认工作区权限。",
    "teamSettings.confirmDuplicateTeamName.cancelLabel": "取消",
    "teamSettings.confirmDuplicateTeamName.message":
      "已存在同名团队。确定要将此团队命名为“{teamName}”吗？",
    "teamSettings.defaultTeam.subtitle": "所有工作区成员将自动添加到团队中。",
    "teamSettings.defaultTeam.title": "设为默认团队",
    "teamSettings.disableDefaultTeam.confirmationModal.confirmButton.label":
      "停止同步团队空间",
    "teamSettings.disableDefaultTeam.confirmationModal.message":
      "是否确定要停止此团队空间与整个组织的同步？当前成员将保留在团队空间中，但不会自动添加新的工作区成员。",
    "teamSettings.disableExportOverride.confirmationButtonLabel":
      "覆盖工作区设置",
    "teamSettings.disableExportOverride.confirmationTitle":
      "是否确定要允许可以导出团队空间页面？默认情况下，无法导出此工作区中的页面。",
    "teamSettings.disableGuests.confirmationTitle":
      "是否确定？此团队空间中的所有页面访客权限都将被移除。",
    "teamSettings.disableGuestsOverride.confirmationButtonLabel":
      "覆盖工作区设置",
    "teamSettings.disableGuestsOverride.confirmationTitle":
      "是否确定要允许访客进入此团队空间？默认情况下，不允许访客进入此工作区中的团队空间。",
    "teamSettings.disablePublicPages.confirmationTitle":
      "是否确定？这将从该团队空间的所有页面中移除任何不是工作区成员或访客的访问权限。",
    "teamSettings.disablePublicPagesOverride.confirmationButtonLabel":
      "覆盖工作区设置",
    "teamSettings.disablePublicPagesOverride.confirmationTitle":
      "确定要允许将团队空间页面设为公开吗？默认情况下，此工作区中的页面不能设为公开。",
    "teamSettings.enableDefaultTeam.confirmationModal.confirmButton.label":
      "同步团队空间",
    "teamSettings.enableDefaultTeam.confirmationModal.message":
      "是否确定要将此团队空间与整个组织同步？工作区中的每个人以及未来的工作区成员都将被添加到此团队空间中。",
    "teamSettings.settingConfirmation.acceptButton": "是",
    "teamSettings.workspaceSettingOverride.confirmationButtonLabel":
      "覆盖工作区设置",
    "teamSettingsGeneral.setting.isDefaultTeam.tooltipInviteOnlyTeam":
      "无法启用默认团队，因为此团队仅限邀请",
    "teamSettingsGeneral.setting.isDefaultTeam.tooltipNonSpaceAdmin":
      "只有工作区管理员可以设置默认团队",
    "teamSettingsGeneral.setting.isDefaultTeam.tooltipNonSpaceWorkspaceOwner":
      "只有工作区所有者才能设置默认团队",
    "teamSettingsSecurity.basedOnWorkspaceSettings":
      "基于<underline>工作区设置</underline>",
    "teamSettingsSecurity.dangerZone.archiveTeamButton": "归档团队空间",
    "teamSettingsSecurity.overridesWorkspaceSettings":
      "覆盖<underline>工作区设置</underline>",
    "teamSettingsSecurity.setting.businessGateToggleTooltip":
      "升级到商业版以更改安全设置",
    "teamSettingsSecurity.setting.enterpriseGateToggleTooltip":
      "升级到企业版以更改安全设置",
    "teamSettingsSecurity.setting.exportCaption":
      "禁止任何人以 Markdown、CSV 或 PDF 格式导出。",
    "teamSettingsSecurity.setting.exportTitle": "禁用导出",
    "teamSettingsSecurity.setting.guestCaption":
      "禁止任何人邀请工作区之外的人访问页面。",
    "teamSettingsSecurity.setting.guestTitle": "禁用访客",
    "teamSettingsSecurity.setting.shareCaption":
      "禁用该团队空间中所有页面的“分享”菜单中的“分享到网络”选项。",
    "teamSettingsSecurity.setting.shareTitle": "禁用公共页面共享",
    "teamSettingsSecurity.setting.topLockCaption":
      "防止成员在侧边栏中创建、移动、重新排序或删除团队的页面列表。",
    "teamSettingsSecurity.setting.topLockTitle": "防止成员编辑团队侧边栏部分",
    "teamWorkspacesSettings.disableTeamCreation.caption":
      "只允许工作区管理员创建团队",
    "teamWorkspacesSettings.disableTeamCreation.title":
      "将团队创建限制为仅管理员",
    "teamWorkspacesSettings.disableTeamCreation.workspaceOwnercaption":
      "仅允许工作区所有者创建团队空间",
    "teamWorkspacesSettings.disableTeamCreation.workspaceOwners.title":
      "仅限工作区所有者才能创建团队空间",
    "teamsDropdownForGroupMenu.filterForTeams.placeholder": "筛选团队空间...",
    "teamsDropdownForMember.filterForTeams.placeholder": "筛选团队...",
    "teamsDropdownForMember.label":
      "{numberOfTeams, plural, other {{numberOfTeams} 个团队}}",
    "teamsDropdownForMember.numMembers":
      "{numMembers} {numMembers, plural, one {位成员} other {位成员}}",
    "teamsDropdownForMember.teamsCount.label":
      "{numberOfTeams, plural, other {{numberOfTeams} 个团队空间}}",
    "teamsDropdownForMember.teamsCountNone.label": "无",
    "teamsEducationContent.teamsEducationSubtitle": "带有团队空间的新侧边栏",
    "teamsEducationContent.teamsEducationTitle": "Notion 2.18中的新增功能",
    "teamsEducationModal.doneButtonCta": "已完成",
    "teamsEducationModal.forAdmins.tabButton.joinTeamspace.subtitle":
      "加入与我相关的团队空间。从“设置”菜单之一管理整个团队空间。",
    "teamsEducationModal.forAdmins.tabButton.joinTeamspace.title":
      "轻松查找和管理团队空间",
    "teamsEducationModal.forAdmins.tabButton.privacySettings.subtitle":
      "对所有用户开放团队或将其保留为私有状态。您可以设置各种安全设置。",
    "teamsEducationModal.forAdmins.tabButton.privacySettings.title":
      "详细的隐私设置，以保护团队的安全",
    "teamsEducationModal.forAdmins.tabButton.teamspaceOrg.subtitle":
      "加入TeamSpace是一种中心，使您可以管理项目、文档和Wiki。",
    "teamsEducationModal.forAdmins.tabButton.teamspaceOrg.title":
      "使用团队空间配置工作空间",
    "teamsEducationModal.forAdmins.tabButton.turnIntoTeamspaces.subtitle":
      "只需单击一下，即可移动所有子页面和用户，以创建团队空间。",
    "teamsEducationModal.forAdmins.tabButton.turnIntoTeamspaces.title":
      "将现有页面转换为团队空间",
    "teamsEducationModal.forMembers.tabButton.customizeTeamspace.subtitle":
      "从外观和感觉到默认访问权限设置，您可以调整所有设置。",
    "teamsEducationModal.forMembers.tabButton.customizeTeamspace.title":
      "根据需要设置团队空间",
    "teamsEducationModal.forMembers.tabButton.joinTeamspace.subtitle":
      "使用与我相关的团队空间自定义侧边栏。",
    "teamsEducationModal.forMembers.tabButton.joinTeamspace.title":
      "找到相关的团队空间并参与",
    "teamsEducationModal.forMembers.tabButton.teamspaceOrg.subtitle":
      "加入TeamSpace是一种中心，使您可以管理项目、文档和Wiki。",
    "teamsEducationModal.forMembers.tabButton.teamspaceOrg.title":
      "团队配置所有设置的空间",
    "teamsEducationModal.forMembers.tabButton.teamspaceOwner.subtitle":
      "作为所有者，管理成员、设置权限和管理设置。",
    "teamsEducationModal.forMembers.tabButton.teamspaceOwner.title":
      "将创建者设置为TeamSpace所有者",
    "teamsEducationModal.learnMoreUrl": "了解有关团队空间的更多信息",
    "teamsEducationModal.nextButtonCta": "下一页",
    "teamsEducationModal.skipMessage": "跳过",
    "teamsInGroupMenu.filterForTeams.numMembers":
      "{numMembers} {numMembers, plural, one {位成员} other {位成员}}",
    "teamsWorkspaceSettings.defaultTeams.caption":
      "选择所有新的和当前工作区成员将自动加入的团队空间",
    "teamsWorkspaceSettings.defaultTeams.inputPlaceholder":
      "选择默认团队空间...",
    "teamsWorkspaceSettings.defaultTeams.title": "默认团队空间",
    "teamsWorkspaceSettings.title": "团队设置",
    "teamsWorkspaceSettings.updateButton.label": "更新",
    "templateChecklist.completed.description":
      "要获得更多启发，请转到 Notion Guides 以提升技能并探索更多使用 Notion 的新方法。",
    "templateChecklist.completed.header": "你完成了！",
    "templateChecklist.quickNote.a.description":
      "在现实场景中查看文档和知识库（A）",
    "templateChecklist.quickNote.a.title": "导入你的工作区（A）",
    "templateChecklist.quickNote.b.description":
      "在现实场景中查看文档和知识库（B）",
    "templateChecklist.quickNote.b.title": "导入你的工作区（A）",
    "templateChecklist.quickNote.c.description":
      "在现实场景中查看文档和知识库（C）",
    "templateChecklist.quickNote.c.title": "导入你的工作区（C）",
    "templateChecklistHeader.useCaseHeader.databases": "数据库入门指南",
    "templateChecklistHeader.useCaseHeader.default": "Notion 入门指南",
    "templateChecklistHeader.useCaseHeader.notes": "笔记入门指南",
    "templateChecklistHeader.useCaseHeader.projectManagement":
      "项目和任务入门指南",
    "templateChecklistHeader.useCaseHeader.wiki": "笔记和文档入门指南",
    "templateDetail.customizableFeatures.label": "可定制的功能",
    "templateDetail.getTemplateButton.label": "获取模板",
    "templateDetail.madeBy.label": "制造者",
    "templateDetail.presetTitle.freeLabel": "免费",
    "templateDetail.relatedTemplates.label": "相关模板",
    "templateGallery.sidebar.category.all": "全部",
    "templateGallery.sidebar.category.docs": "文档",
    "templateGallery.sidebar.category.notesMeetings": "笔记和会议",
    "templateGallery.sidebar.category.tasksProjects": "任务和项目",
    "templateGallery.sidebar.category.title": "类别",
    "templateGallery.sidebar.category.wikis": "知识库",
    "templateGallery.sidebar.persona.all": "全部",
    "templateGallery.sidebar.persona.design": "设计",
    "templateGallery.sidebar.persona.eng": "工程",
    "templateGallery.sidebar.persona.finance": "金融",
    "templateGallery.sidebar.persona.hr": "人力资源",
    "templateGallery.sidebar.persona.marketing": "市场营销",
    "templateGallery.sidebar.persona.pm": "产品管理",
    "templateGallery.sidebar.persona.sales": "销售",
    "templateGallery.sidebar.persona.support": "支持",
    "templateGallery.sidebar.searchbar.placeholder": "搜索模板",
    "templateGallerySidebar.topPicksSection.label": "热门精选",
    "templateHelpers.personas.design": "设计",
    "templateHelpers.personas.education": "教育",
    "templateHelpers.personas.educator": "教育工作者",
    "templateHelpers.personas.engineering": "开发",
    "templateHelpers.personas.entrepreneur": "企业家",
    "templateHelpers.personas.freelancer": "自由职业者",
    "templateHelpers.personas.gettingStarted": "立即开始",
    "templateHelpers.personas.humanResources": "人力资源",
    "templateHelpers.personas.it": "IT",
    "templateHelpers.personas.marketing": "市场营销",
    "templateHelpers.personas.media": "媒体",
    "templateHelpers.personas.other": "其他",
    "templateHelpers.personas.personal": "个人",
    "templateHelpers.personas.productManagement": "产品管理",
    "templateHelpers.personas.productManagementV2": "产品",
    "templateHelpers.personas.sales": "销售",
    "templateHelpers.personas.student": "学生",
    "templateHelpers.personas.suggestedTemplates": "建议模板",
    "templateHelpers.personas.support": "支持",
    "templateHelpers.personas.truncated.humanResources": "人力资源",
    "templateHelpers.templates.applicantTracker": "招聘追踪器",
    "templateHelpers.templates.blogPost": "博客文章",
    "templateHelpers.templates.brandAssets": "品牌资产",
    "templateHelpers.templates.classDirectory": "班级目录",
    "templateHelpers.templates.classNotes": "课堂笔记",
    "templateHelpers.templates.classroomHome": "课堂首页",
    "templateHelpers.templates.clubHomepage": "社团主页",
    "templateHelpers.templates.companyGoals": "公司目标",
    "templateHelpers.templates.companyHome": "公司内部主页",
    "templateHelpers.templates.competitiveAnalysis": "竞争分析",
    "templateHelpers.templates.contentCalendar": "内容日历",
    "templateHelpers.templates.cornellNotesSystem": "康奈尔笔记系统",
    "templateHelpers.templates.courseSchedule": "课程时间表",
    "templateHelpers.templates.designSystem": "设计系统",
    "templateHelpers.templates.designTasks": "设计任务",
    "templateHelpers.templates.docs": "文档",
    "templateHelpers.templates.engineeringWiki": "工程知识库",
    "templateHelpers.templates.getStarted": "立即开始",
    "templateHelpers.templates.getStartedOnEvernote": "从 Evernote 开始",
    "templateHelpers.templates.getStartedOnMobile": "移动版入门指南",
    "templateHelpers.templates.goals": "目标",
    "templateHelpers.templates.gradeCalculator": "成绩计算器",
    "templateHelpers.templates.habitTracker": "习惯追踪器",
    "templateHelpers.templates.helpCenter": "帮助中心",
    "templateHelpers.templates.jobApplications": "工作申请",
    "templateHelpers.templates.jobBoard": "职位公告板",
    "templateHelpers.templates.journal": "日志",
    "templateHelpers.templates.lessonPlans": "课程计划",
    "templateHelpers.templates.lifeWiki": "生活知识库",
    "templateHelpers.templates.mediaList": "媒体列表",
    "templateHelpers.templates.meetingNotes": "会议记录",
    "templateHelpers.templates.moodBoard": "情绪板",
    "templateHelpers.templates.newHireOnboarding": "新员工入职",
    "templateHelpers.templates.notes": "笔记和文档",
    "templateHelpers.templates.personalCRM": "个人 CRM",
    "templateHelpers.templates.personalHome": "个人主页",
    "templateHelpers.templates.processDocs": "流程文档",
    "templateHelpers.templates.productFAQs": "产品常见问题解答",
    "templateHelpers.templates.productWiki": "产品知识库",
    "templateHelpers.templates.projectManagement": "项目和任务",
    "templateHelpers.templates.quickNote": "快速笔记",
    "templateHelpers.templates.readingList": "阅读清单",
    "templateHelpers.templates.resume": "简历",
    "templateHelpers.templates.roadmap": "产品路线图",
    "templateHelpers.templates.roommateSpace": "室友空间",
    "templateHelpers.templates.salesAssets": "销售资产",
    "templateHelpers.templates.salesCRM": "销售 CRM",
    "templateHelpers.templates.salesWiki": "销售知识库",
    "templateHelpers.templates.simpleBudget": "简单预算",
    "templateHelpers.templates.simpleNotebook": "简单笔记本",
    "templateHelpers.templates.syllabus": "教学大纲",
    "templateHelpers.templates.taskList": "任务列表",
    "templateHelpers.templates.teamDirectory": "团队目录",
    "templateHelpers.templates.teamsGettingStarted": "团队入门指南",
    "templateHelpers.templates.teamsHomepage": "团队空间主页",
    "templateHelpers.templates.thesisPlanning": "论文规划",
    "templateHelpers.templates.toDo": "待办事项",
    "templateHelpers.templates.travelPlanner": "旅行计划",
    "templateHelpers.templates.userResearchDatabase": "用户调研数据库",
    "templateHelpers.templates.weeklyAgenda": "每周议程",
    "templateHelpers.templates.wiki": "团队知识库",
    "templateHelpers.useCase.bookmarks": "书签",
    "templateHelpers.useCase.personalNotebook": "笔记本",
    "templateHelpers.useCase.teamDocs": "文档",
    "templateHelpers.useCase.teamHome": "团队主页",
    "templateHelpers.useCase.teamMeetingNotes": "会议记录",
    "templateHelpers.useCase.teamTasks": "团队任务",
    "templateHelpers.useCase.todos": "待办事项",
    "templatePicker.databaseTemplates.label": "数据库",
    "templatePicker.deviceOffline.goOnlinePrompt":
      "{isMobileDevice, select, true{按此处创建空白页。在连接网络后可使用模板。}other{按 Enter 键创建一个空白页。在连接网络后可使用模板。}}",
    "templatePicker.isTemplate.emptyPagePrompt":
      "{isMobileDevice, select, true{按此处创建空白页。}other{按 Enter 键创建空白页。}}",
    "templatePicker.mobileCollectionEmptyPage.prompt":
      "{isParentLocked, select, true{按此处创建空白页}other{按此处创建空白页，或<templatebutton>创建模板</templatebutton>}}",
    "templatePicker.mobilePhoneEmptyPage.withTemplates.prompt": "点击此处继续…",
    "templatePicker.mobileTabletEmptyPage.withTemplates.prompt":
      "点击此处继续使用空白页，或选择一个模板",
    "templatePicker.mobileTemplatePicker.databaseTemplateSection.label":
      "数据库",
    "templatePicker.webCollectionEmptyPage.prompt":
      "{isParentLocked, select, true{按 Enter 创建空白页}other{按 Enter 创建空白页，或<templatebutton>创建模板</templatebutton>}}",
    "templatePicker.webEmptyPage.withTemplates.prompt":
      "{isTemplate, select, true{按 Enter 创建空白页，或选择模板}other{按 Enter 创建空白页，或选择模板（↑↓来选择）}}",
    "templatePickerHelpers.basicTemplateItems.empty": "空白页",
    "templatePickerHelpers.basicTemplateItems.emptyWithIcon": "空白页（图标）",
    "templatePickerHelpers.basicTemplateItems.import": "导入",
    "templatePickerHelpers.basicTemplateItems.templates": "模板",
    "templatePickerHelpers.databaseTemplateNames.board": "看板",
    "templatePickerHelpers.databaseTemplateNames.boardView": "看板视图",
    "templatePickerHelpers.databaseTemplateNames.calendar": "日历",
    "templatePickerHelpers.databaseTemplateNames.calendarView": "日历视图",
    "templatePickerHelpers.databaseTemplateNames.gallery": "画廊",
    "templatePickerHelpers.databaseTemplateNames.galleryView": "画廊视图",
    "templatePickerHelpers.databaseTemplateNames.list": "列表",
    "templatePickerHelpers.databaseTemplateNames.listView": "列表视图",
    "templatePickerHelpers.databaseTemplateNames.table": "表格",
    "templatePickerHelpers.databaseTemplateNames.tableView": "表格视图",
    "templatePickerHelpers.databaseTemplateNames.timeline": "时间轴",
    "templatePickerHelpers.databaseTemplateNames.timelineView": "时间轴视图",
    "templatePickerHelpers.mobileBasicTemplateItems.emptyPage": "空白页",
    "templatePickerHelpers.mobileBasicTemplateItems.pageWithIcon":
      "空白页（图标）",
    "templatePreview.getTemplateButton.label": "获取模板",
    "templatePreview.presetTitle.freeLabel": "免费",
    "temporaryPasscodeLoginEmail.copyPasteCodeNoLink.prompt":
      "{hasExistingUser, select, true {复制并粘贴此临时登录码： } other {复制并粘贴此临时注册码： }}",
    "temporaryPasscodeLoginEmail.copyPasteCodeWithLink.prompt":
      "{hasExistingUser, select, true {或复制并粘贴此临时登录码： } other {或复制并粘贴此临时注册码： }}",
    "temporaryPasscodeLoginEmail.loginCode.subjectLine":
      "你的临时 Notion 登录码为 {temporaryPassword}",
    "temporaryPasscodeLoginEmail.magicLink.text":
      "{hasExistingUser, select, true {点击此处使用此魔法链接登录} other {点击此处使用此魔法链接注册}}",
    "temporaryPasscodeLoginEmail.noNotionAccount.text":
      "我们找不到此邮箱地址上的帐户。",
    "temporaryPasscodeLoginEmail.noRequest.text":
      "{hasExistingUser, select, true {如果你未尝试登录，则可以安全地忽略此电子邮件。} other {如果你没有尝试注册，则可以放心忽略此电子邮件。}}",
    "temporaryPasscodeLoginEmail.setPermanentPassword.text":
      "提示：你可以在“设置与成员”&rarr;“我的帐户”中设定永久密码。",
    "temporaryPasscodeLoginEmail.signupCode.subjectLine":
      "你的 Notion 注册码为 {temporaryPassword}",
    "temporaryPasscodeLoginEmail.titleOfEmail":
      "{hasExistingUser, select, true {登录} other {注册}}",
    "text.commandsMenuNotOpen.placeholder": "输入“/”发起指令",
    "text.commandsMenuOpen.placeholder": "输入以筛选…",
    "text.truncated.showMoreLabel": "更多",
    "textRenderHelpers.commentMention.attachments.title":
      "{numberOfAttachments, plural, other {{numberOfAttachments} 个附件}}",
    "textRenderHelpers.commentMention.noAccess.title": "无权访问页面评论",
    "textRenderHelpers.commentMention.untitledPlaceholder": "无标题",
    "textRenderHelpers.pageMention.untitledPlaceholder": "无标题",
    "textRenderHelpers.untitledTextAsString": "无标题",
    "timeUtils.durationDescriptor.day":
      "{numDays, plural, other {{numDays} 天前}}",
    "timeUtils.durationDescriptor.hour":
      "{numHours, plural, other {{numHours} 小时前}}",
    "timeUtils.durationDescriptor.minute": "刚才",
    "timeline.itemPlaceholder.newPage": "新页面",
    "timelineItem.itemName.placeholder": "输入名称…",
    "todoBlock.placeholder": "待办事项",
    "toggleBlock.emptyBlock.placeholderText":
      "空的折叠块。点击或拖动块到这里。",
    "toggleBlock.placeholder": "折叠列表",
    "topbar.commentsButton.closeSidebartTooltip": "关闭所有评论",
    "topbar.commentsButton.openSidebartTooltip": "查看所有评论",
    "topbar.commentsButton.title": "评论",
    "topbar.connectionSection.connectionIntegration.label": "{connectionName}",
    "topbar.connectionSection.disconnectIntegration.label": "断开与页面的连接",
    "topbar.connectionSection.disconnectIntegrationConfirmation.label":
      "{botName}将从所有子页面中删除。是否继续？",
    "topbar.connectionSection.disconnectIntegrationFromParent.label":
      "从父页面断开连接",
    "topbar.connectionSection.label": "已连接",
    "topbar.connectionsSection.connectedIntegration.label":
      "{connectedIntegrationName}",
    "topbar.connectionsSection.connectedIntegrationLoading.loading":
      "连接加载中…",
    "topbar.connectionsSection.connectionLoading.label": "正在导入连接...",
    "topbar.connectionsSection.connectionMore.label": "更多",
    "topbar.connectionsSection.connectionSearchError.label": "发生了问题。",
    "topbar.connectionsSection.connectionSearchResult.label": "{name}",
    "topbar.connectionsSection.connectionsLoading.label": "连接加载中…",
    "topbar.connectionsSection.connectionsMore.label": "更多",
    "topbar.connectionsSection.connectionsMoreSettings.label": "更多连接",
    "topbar.connectionsSection.disconnectIntegration.label": "断开与页面的连接",
    "topbar.connectionsSection.disconnectIntegrationFromParent.label":
      "断开与父级的连接",
    "topbar.connectionsSection.discoverIntegration.label":
      "{discoverIntegrationName}",
    "topbar.connectionsSection.manageConnections.label": "管理连接",
    "topbar.connectionsSection.searchConnections.label": "查找连接",
    "topbar.connectionsSection.suggestedConnection.label":
      "{suggestedConnectionName}",
    "topbar.favoriteButton.activeTitle": "已加到最爱",
    "topbar.favoriteButton.activeTooltip1": "从侧边栏隐藏此页面",
    "topbar.favoriteButton.title": "加到最爱",
    "topbar.favoriteButton.tooltip1": "将此页面固定在侧边栏中",
    "topbar.moreButton.collectionHelpButton": "了解数据库",
    "topbar.presenceIndicator.hiddenUsers.lastViewedBy.tooltip": "上次查看者",
    "topbar.presenceIndicator.hiddenUsers.otherCount.message":
      "{hiddenUsersCount, plural, other {+{hiddenUsersCount}}}",
    "topbar.presenceIndicator.hiddenUsers.viewingNow.tooltip": "正在查看",
    "topbar.presenceIndicator.lastViewedTime.tooltip": "{timeFromNow}查看过",
    "topbar.presenceIndicator.viewingNow.tooltip": "正在查看",
    "topbar.presenceIndicator.viewingNowWithLocation.tooltip":
      "正在查看。点击以查看他的位置。",
    "topbar.publicPage.TryNotionCTAExperiment.label.try.V1": "Notion",
    "topbar.publicPage.TryNotionCTAExperiment.label.try.V3": "试用 Notion",
    "topbar.publicPage.comment": "评论",
    "topbar.publicPage.cta.label.open": "打开 Notion",
    "topbar.publicPage.cta.label.try": "试用 Notion",
    "topbar.publicPage.cta.label.try.V1": "免费试用 Notion",
    "topbar.publicPage.cta.label.try.V2": "注册 Notion",
    "topbar.publicPage.cta.label.try.V3": "试用 Notion",
    "topbar.publicPage.cta.label.try.V4": "免费试用 Notion",
    "topbar.publicPage.cta.label.try.V5": "注册 Notion",
    "topbar.publicPage.duplicateButton.label": "保存副本",
    "topbar.publicPage.edit": "编辑",
    "topbar.publicPage.searchButton.label": "搜索",
    "topbar.shareButton.title": "分享",
    "topbar.shareButton.tooltip": "分享或发布到网络上",
    "topbar.startPublicEditDialog.continueLabel": "继续",
    "topbar.startPublicEditDialog.message":
      "当你开始编辑时，页面所有者将可以看到你的姓名，邮箱地址和头像。",
    "topbar.updatesButton.closeSidebartTooltip": "关闭所有更新",
    "topbar.updatesButton.emptyState": "此页面尚未进行编辑。",
    "topbar.updatesButton.openSidebartTooltip": "打开更新侧边栏",
    "topbar.updatesButton.slackIntegrationButton.activeTitle": "基于",
    "topbar.updatesButton.slackIntegrationButton.connectedCaption":
      "已连接到Slack通道",
    "topbar.updatesButton.slackIntegrationButton.disconnectTooltip":
      "解除绑定 Slack 频道，以停止获取有关此页面及其中页面的更新。",
    "topbar.updatesButton.slackIntegrationButton.loading": "载入中…",
    "topbar.updatesButton.slackIntegrationButton.title": "绑定 Slack 频道",
    "topbar.updatesButton.slackIntegrationButton.tooltip":
      "绑定 Slack 频道以获取有关此页面及其中页面的更新。",
    "topbar.updatesButton.title": "更新",
    "topbar.updatesButton.tooltip": "查看此页面过去的更改",
    "topbarBrowserHistoryButton.goForwardButton.label": "前进",
    "topbarBrowserHistoryButtons.goBackButton.label": "后退",
    "topbarConnectionSection.sectionMenu.title": "连接目标",
    "topbarMobile.addToPageOrWorkspaceSectionButton.label": "添加到",
    "topbarMobile.addToPrivateSectionButton.label":
      "<mediumcolor>添加到</mediumcolor>{userAvatar}<mediumweight>私人页面</mediumweight>",
    "topbarMobile.backButton.label": "返回",
    "topbarMobile.cancelQuickAddButton.label": "取消",
    "topbarMobile.commentsMenu.title": "评论",
    "topbarMobile.offline.message": "你处于离线状态",
    "topbarMoreButton.loggedOut.tooltip": "更多...",
    "topbarMoreButton.mobileActionsMenu.title": "动作",
    "topbarMoreButton.tooltip": "样式、导出等…",
    "topbarPresence.presenceIndicator.hiddenUsers.moreUsersNotViewing.tooltip":
      "其他 {notViewingMoreUsersCount} 位…",
    "transactionErrors.activityEditsMaxSize.message":
      "你已超出每页的最大编辑次数。",
    "transactionErrors.atLeastOneAdminInWorkspace.message":
      "你的工作区中至少需要一名管理员。",
    "transactionErrors.atLeastOneDefaultTeam.message":
      "你的工作区中至少需要有一个默认团队。",
    "transactionErrors.blockContentMaxSize.message":
      "你已超出每页的最大内容数。",
    "transactionErrors.blockPermissionsMaxSize.message":
      "你已超出每页的最大权限。",
    "transactionErrors.blocksInsideThemselvesNotAllowed.message":
      "糟糕！区块无法在自己内部移动。",
    "transactionErrors.cannotArchiveOnlyDefaultTeam.message":
      "无法归档此团队，因为它是此工作区中唯一的默认团队。",
    "transactionErrors.cannotDowngradeSelfIfOnlyOwner.message":
      "不能将自己降级为成员，因为团队必须至少有一个所有者。",
    "transactionErrors.cannotInviteGuestsToTeam":
      "无法邀请不是此工作区成员的人员加入团队。",
    "transactionErrors.cannotJoinClosedTeam.message":
      "无法加入封闭式团队。请联系该团队的所有者以获得邀请。",
    "transactionErrors.cannotJoinPrivateTeam.message":
      "无法加入私人团队。请联系待邀请团队的所有者。",
    "transactionErrors.cannot_archive_only_default_team.message":
      "无法归档此团队，因为它是此工作区中唯一的默认团队。",
    "transactionErrors.cantAddNewMembersFromThisJurisdiction":
      "我们目前不允许来自该司法管辖区的客户添加新成员。",
    "transactionErrors.cantAddNewMembersFromThisJursidiction":
      "我们目前不允许客户添加来自该司法管辖区的新成员。",
    "transactionErrors.commentOnlyAccessCantMovePage.message":
      "抱歉，你无法移动此页面，因为你只有＂只能评论＂访问权限。",
    "transactionErrors.databaseSyncsOverLimit": "你已达到同步数据库限制。",
    "transactionErrors.guestsInvitedTooQuickly.message":
      "你邀请访客加入工作区的速度太快。请稍后再试。",
    "transactionErrors.guestsNotAllowed.message": "此工作区不允许访客。",
    "transactionErrors.guestsoverLimit.message":
      "此工作区已达到最多访客数（5位）。",
    "transactionErrors.movingPagesToOtherWorkspacesNotAllowed.message":
      "此工作区已禁用将页面移动到其他工作区。",
    "transactionErrors.nonApiMovesNotAllowed.message":
      "请刷新（Cmd / Ctrl + R）以更新 Notion 后便可将页面移动到其他工作区。",
    "transactionErrors.nonOwnersCannotSetIsDefault":
      "只有团队所有者可以设置团队的默认状态。",
    "transactionErrors.publicAccessNotAllowed.message":
      "此工作区不允许具有公开访问权限的页面。",
    "transactionErrors.publicAccessNotAllowedInTeam.message":
      "此团队不允许具有公共访问权限的页面。",
    "transactionErrors.searchEngineIndexingNotAllowed.message":
      "此工作空间不允许公开页包含在搜索索引中。",
    "transactionErrors.spaceAllowedEmailDomainMatchesNoMembers.message":
      "允许的电子邮件域名必须与至少一个成员匹配。",
    "transactionErrors.spaceDomainNotAvailable.message": "抱歉，此域名不可用。",
    "transactionErrors.spaceEmailDomainNotAllowed.message":
      "抱歉，不允许使用此域名： {domain}",
    "transactionErrors.teamDescriptionTooLong.message":
      "团队描述必须少于 {maxTeamDescriptionLength} 个字符。",
    "transactionErrors.teamLevelGuestsNotAllowed.message": "此团队不允许访客。",
    "transactionErrors.teamNameEmpty.message": "团队名称不能为空。",
    "transactionErrors.teamNameTooLong.message":
      "团队名称必须小于 {maxTeamNameLength} 个字符。",
    "transactionErrors.teamPageEditOperationNotAllowed.message":
      "抱歉，你不能向此团队空间添加页面或从中删除页面。",
    "transactionErrors.teamTopLevelOperationNotAllowed.message":
      "此团队已锁定其侧边栏固定页面。",
    "transactionErrors.teamTopLevelPageMismatch.message":
      "顶层团队页面不在其父级 Team.team_pages 中。",
    "transactionErrors.upgradeClientIsNeeded.message":
      "请刷新(Cmd/Ctrl+R)以更新Notion，然后重试。",
    "transactionErrors.workspaceTopLevelOperationNotAllowed.message":
      "此工作区已锁定修改侧边栏的工作区部分。",
    "transactionHelpers.requestTooLargeError.message":
      "抱歉，此请求太大。尝试导入？",
    "transclusionContainerBlock.actions.copySuccessMessage":
      "复制完成！现在，您可以将内容粘贴到所需的页面上以同步内容。",
    "transclusionContainerBlock.copy": "拷贝并同步",
    "transclusionContainerBlock.differingPermissionsWarning":
      "不是每个人都能看到此内容。原始页面<page>源页面标题</page>未与此页面上的所有人共享。",
    "transclusionContainerBlock.editingMultiple":
      "在 {icon} {numberOfBacklinks, plural, one {其他 {numberOfBacklinks} 个页面} other {其他 {numberOfBacklinks} 个页面}}中编辑",
    "transclusionContainerBlock.editingOriginal": "编辑原件",
    "transclusionContainerBlock.emptyEditingPlaceholder":
      "在此处点击或拖动块，然后粘贴到另一个页面以同步内容。",
    "transclusionContainerBlock.learnMoreLabel": "了解有关同步块的更多信息",
    "transclusionContainerBlock.remove.confirm": "删除并取消同步副本",
    "transclusionContainerBlock.remove.confirmationMessage.header":
      "全部取消同步？",
    "transclusionContainerBlock.remove.confirmationMessage.text":
      "{numberOfBacklinks, plural, one {其他 {numberOfBacklinks} 个页面} other {其他 {numberOfBacklinks} 个页面}}将不再与这些块同步。",
    "transclusionContainerBlock.remove.header": "删除原内容？",
    "transclusionContainerBlock.remove.text":
      "这些块在 {numberOfBacklinks, plural, one {其他 {numberOfBacklinks} 个页面} other {其他 {numberOfBacklinks} 个页面}}中同步。如果你删除原内容，这些块将不再同步。",
    "transclusionContainerBlock.unsyncTransclusionContainer.confirm":
      "全部取消同步",
    "transclusionContainerBlock.unsyncTransclusionContainer.header":
      "全部取消同步？",
    "transclusionContainerBlock.unsyncTransclusionContainer.text":
      "{numberOfBacklinks, plural, one {其他 {numberOfBacklinks} 个页面} other {其他 {numberOfBacklinks} 个页面}}将不再与这些块同步。",
    "transclusionContainerBlock.unsyncTransclusionReference.confirm":
      "取消同步",
    "transclusionContainerBlock.unsyncTransclusionReference.header":
      "取消同步此项？",
    "transclusionContainerBlock.unsyncTransclusionReference.text":
      "选定的块将不再与原始块同步。",
    "trashActions.deletePagePermanentlyDialog.confirmDeleteButton.label":
      "是的，删除此页面",
    "trashActions.deletePagePermanentlyDialog.prompt":
      "确定要永久删除此页面吗？",
    "trelloActions.authenticatingWithTrello.loadingMessage": "Trello 授权中…",
    "trelloActions.loginPopupModal.title": "Trello 登录",
    "trelloImportOption.actionsMenu.connectAnotherAccount": "绑定另一个帐户",
    "trelloImportOption.actionsMenu.import": "导入",
    "trelloImportOption.actionsMenu.removeIntegration": "移除",
    "trelloImportOption.boardProperty.defaultName": "看板",
    "trelloImportOption.search.noResultsPlaceholder": "无看板",
    "trelloImportOption.search.placeholder": "搜索看板…",
    "tweetBlock.embedTweet.button.label": "嵌入推文",
    "tweetBlock.linkInput.caption": "适用于 Twitter 上的推文链接",
    "tweetBlock.placeholder": "嵌入推文",
    "tweetRenderer.errorLoadingTweet.message": "载入推文时出错",
    "tweetRenderer.loadingTweet.message": "载入推文中…",
    "typeformBlock.embed.caption": "适用于启用了公共访问的 Typeform 链接",
    "typeformBlock.placeholder": "嵌入 Typeform",
    "uidoc.colors.copied": "已复制 {colorCode}",
    "unfurling.asana.asanaAssignedTo": "已分配给 {value} 人",
    "unfurling.asana.asanaDueAt": "截止时间为 {value}",
    "unfurling.asana.asanaProject": "Asana 中的项目",
    "unfurling.asana.asanaTask": "Asana 中的任务",
    "unfurling.asana.asanaUpdatedAt": "更新时间为 {value}",
    "unfurling.authenticateButton.title": "绑定 {integration} 以更新",
    "unfurling.dropbox.dropboxFile": "Dropbox 文件",
    "unfurling.errorOptions.authenticateAction.alreadyAuthenticated.title":
      "绑定另一个 {integration} 帐户",
    "unfurling.errorOptions.authenticateAction.alreadyAuthenticatedCompact.title":
      "绑定另一个帐户",
    "unfurling.errorOptions.authenticateAction.notAuthenticated.title":
      "绑定 {integration} 帐户",
    "unfurling.errorOptions.authenticateAction.reAuthenticate.title":
      "重新验证帐户",
    "unfurling.errorOptions.learnMore.title": "了解有关此错误的更多信息",
    "unfurling.errorOptions.menuTitle": "请尝试以下选项",
    "unfurling.errorOptions.removeAction.title": "移除",
    "unfurling.errorOptions.replace.title": "更改 URL",
    "unfurling.errorOptions.tryAgainAction.title": "再试一次",
    "unfurling.figma.figmaFile": "Figma 文件",
    "unfurling.figma.figmaLastModifiedBy": "上次由 {value} 修改",
    "unfurling.generic.assigned": "已分配",
    "unfurling.generic.author": "作者",
    "unfurling.generic.created": "创建时间",
    "unfurling.generic.due": "截止时间",
    "unfurling.generic.lastModifiedAt": "修改时间",
    "unfurling.generic.lastModifiedBy": "修改者",
    "unfurling.generic.project": "项目",
    "unfurling.generic.section": "分部",
    "unfurling.generic.status": "状态",
    "unfurling.generic.type": "类型",
    "unfurling.generic.updated": "更新时间",
    "unfurling.github.githubCommit": "提交",
    "unfurling.github.githubCommitted": "提交时间：{value}",
    "unfurling.github.githubIssue": "Issue{value}",
    "unfurling.github.githubIssues": "{value} 个问题",
    "unfurling.github.githubPullClosed": "Closed {value}",
    "unfurling.github.githubPullMerged": "Merged：{value}",
    "unfurling.github.githubPullOpened": "Opened：{value}",
    "unfurling.github.githubPullRequest": "Pull Request {value}",
    "unfurling.github.githubPullRequests": "{value} 个拉取请求",
    "unfurling.github.githubRepoUpdated": "Updated {value}",
    "unfurling.github.issue": "问题",
    "unfurling.github.jiraUpdated": "Updated {value}",
    "unfurling.github.owner": "所有者",
    "unfurling.github.pullRequest": "PR",
    "unfurling.jira.jiraAssignee": "{value}分配给人员",
    "unfurling.slack.replies": "回复数",
    "unfurling.slack.slackMessage": "Slack 中的消息",
    "unfurling.slack.slackReplyCount":
      "{value, plural, other {{value} 条回复}}",
    "unfurling.slack.slackThread": "Slack 中的消息列",
    "unfurling.trello.list": "列表",
    "unfurling.trello.trelloAssignedTo": "已分配给 {value} 人",
    "unfurling.trello.trelloCard": "Trello 中的卡片",
    "unfurling.trello.trelloDueAt": "截止时间为 {value}",
    "unfurling.trello.trelloUpdatedAt": "更新时间为 {value}",
    "unfurling.updateButton.header": "此链接预览已过期。",
    "unfurling.updateButton.title": "更新",
    "unfurling.zoom.host": "主持人",
    "unfurling.zoom.joinZoomMeeting": "加入 Zoom 会议",
    "unfurling.zoom.meetingId": "会议 ID",
    "unfurling.zoom.passcode": "登录码",
    "unfurling.zoom.zoomPasscode": "密码： {value}",
    "unfurlingHelpers.authenticatedErrorDescription.accessDenied":
      "资源所有者或授权服务器拒绝了该请求。请与你的组织或资源所有者联系，确保 OAuth 安装已启用。",
    "unfurlingHelpers.authenticatedErrorDescription.invalidRequest":
      "授权请求无效。如果问题依然存在，请联系客服。",
    "unfurlingHelpers.authenticatedErrorDescription.invalidScope":
      "请求的作用域无效。如果问题仍然存在，请联系客服。",
    "unfurlingHelpers.authenticatedErrorDescription.serverError":
      "授权服务器遇到了阻止它完成请求的意外情况。如果问题依然存在，请联系客服。",
    "unfurlingHelpers.authenticatedErrorDescription.temporarilyUnavailable":
      "由于服务器临时超载或维护，授权服务器目前无法处理该请求。如果问题依然存在，请联系客服。",
    "unfurlingHelpers.authenticatedErrorDescription.unknownError":
      "授权服务器响应了一个未知错误 (`{value}`)。如果问题依然存在，请联系客服。",
    "unfurlingHelpers.authenticatedErrorDescription.unsupportedResponseType":
      "授权服务器不支持使用这种方法获得授权代码。如果问题仍然存在，请联系客服。",
    "unfurlingHelpers.unauthorizedClient.":
      "未授权客户端使用此方法请求授权代码。如果问题依然存在，请联系客服。",
    "unfurlingHelpers.unfurlResponseError.accessDenied": "拒绝访问",
    "unfurlingHelpers.unfurlResponseError.databaseSyncLimit":
      "已达到同步数据库限制",
    "unfurlingHelpers.unfurlResponseError.githubNotAcceptable":
      "需要所有者角色",
    "unfurlingHelpers.unfurlResponseError.invalidRequest": "无法加载预览",
    "unfurlingHelpers.unfurlResponseError.jiraNotAcceptable":
      "已在另一个工作区中同步",
    "unfurlingHelpers.unfurlResponseError.notAcceptable": "需要所有者角色",
    "unfurlingHelpers.unfurlResponseError.notFound": "找不到内容",
    "unfurlingHelpers.unfurlResponseError.rateLimited": "请求太多",
    "unfurlingHelpers.unfurlResponseError.reAuthenticate":
      "需要重新进行身份验证",
    "unfurlingHelpers.unfurlResponseError.serverError": "无法加载预览",
    "unfurlingHelpers.unfurlResponseError.unknownError": "无法加载预览",
    "unfurlingHelpers.unfurlResponseError.unprocessableEntity":
      "无法识别的 URL",
    "unfurlingHelpers.unfurlResponseErrorDescription.accessDenied":
      "你没有访问此资源的适当权限。",
    "unfurlingHelpers.unfurlResponseErrorDescription.databaseSyncLimit":
      "您的工作区已达到同步数据库限制。",
    "unfurlingHelpers.unfurlResponseErrorDescription.githubNotAcceptable":
      "您没有同步此资源的适当权限。您需要具有所有者角色。",
    "unfurlingHelpers.unfurlResponseErrorDescription.invalidRequest":
      '尝试获取此资源的信息时出错。收到的错误代码为 "{statusCode}"。',
    "unfurlingHelpers.unfurlResponseErrorDescription.jiraNotAcceptable":
      "您已在另一个工作区中同步此资源。",
    "unfurlingHelpers.unfurlResponseErrorDescription.notAcceptable":
      "你没有同步此资源的适当权限。你需要具有所有者角色。",
    "unfurlingHelpers.unfurlResponseErrorDescription.notFound":
      "找不到此链接的资源信息。它可能已不存在，或者你可能没有适当的访问权限。",
    "unfurlingHelpers.unfurlResponseErrorDescription.rateLimited":
      '"{integrationName}" 收到了太多来自你或你所在组织的请求。请等待几分钟，然后重试。',
    "unfurlingHelpers.unfurlResponseErrorDescription.reAuthenticate":
      "你需要重新验证自己的帐户才能访问此资源。",
    "unfurlingHelpers.unfurlResponseErrorDescription.serverError":
      '尝试获取此资源的信息时出错。收到的错误代码为 "{statusCode}"。',
    "unfurlingHelpers.unfurlResponseErrorDescription.unknownError":
      '尝试获取此资源的信息时出错。收到的错误代码为 "{statusCode}"。',
    "unfurlingHelpers.unfurlResponseErrorDescription.unprocessableEntity":
      "此集成当前无法嵌入此 URL。",
    "unfurlingMenu.actions.pasteAsDatabase.title": "粘贴为数据库",
    "unfurlingMenu.actions.pasteAsLink.title": "以链接形式粘贴",
    "unfurlingMenu.actions.pasteAsMention.title": "以提及形式粘贴",
    "unfurlingMenu.actions.pasteAsPreview.title": "以预览形式粘贴",
    "unsubscribeFromEmails.workspace.confirmUnsubscribeDescription":
      "确定要取消订阅此列表吗？",
    "unsubscribeFromEmails.workspace.message":
      "你已成功退订{workspaceName}的电子邮件",
    "unwantedContentTakedownEmail.body.appeal":
      "如果你想对此决定提出上诉，请发送电子邮件至 <mailto>team@makenotion.com</mailto>，详细说明你的内容已如何更改或未违反我们的政策。",
    "unwantedContentTakedownEmail.body.consequence":
      "因此，此页面不再公开。你仍然可以在你的私人工作区中访问它。",
    "unwantedContentTakedownEmail.body.intro": "感谢你使用 Notion。",
    "unwantedContentTakedownEmail.body.takedown":
      "我们写这封信是为了告诉你，我们已确定位于<pagelink>此页面</pagelink>上的内容不符合我们的<contentpolicylink>内容与使用政策</contentpolicylink>中列出的标准。",
    "unwantedContentTakedownEmail.closingText":
      "谢谢你。{br} ──来自 Notion 团队",
    "unwantedContentTakedownEmail.greetingWithName": "嗨，{customerName}！",
    "unwantedContentTakedownEmail.greetingWithoutName": "嗨，你好！",
    "unwantedContentTakedownEmail.subjectLine.text":
      "你的 Notion 帐户：公共页面上已审核的内容",
    "updateBanner.updateAvailableBanner.message": "更新并查看新功能",
    "updateSidebar.commentContainer.emptyResolved":
      "此页上的已解决评论将在此处显示。",
    "updateSidebar.commentContainer.emptyTitleResolved": "未解决评论",
    "updateSidebar.commentContainer.emptyTitleUnresolved": "尚无公开评论",
    "updateSidebar.commentContainer.emptyUnresolved":
      "此页面上的公开评论将显示在这里",
    "updateSidebar.commentContainer.restricted": "你无权查看此受限页面的更新。",
    "updateSidebar.comments.filter.button.resolvedMode": "已解决",
    "updateSidebar.comments.filter.button.unresolvedMode": "未解决",
    "updateSidebar.comments.mode.resolvedOption": "已解决的评论",
    "updateSidebar.comments.mode.unresolvedOption": "未解决的评论",
    "updateSidebar.commentsTab.title": "评论",
    "updateSidebar.header.commentsLabel": "评论",
    "updateSidebar.header.updatesLabel": "更新",
    "updateSidebar.placeholder.addComment": "添加评论...",
    "updateSidebar.updatesContainer.empty": "此页面没有更新。",
    "updateSidebar.updatesContainer.emptyAfterSearch":
      "没有更新与请求的筛选器匹配。",
    "updateSidebar.updatesTab.title": "更新",
    "updateSidebarSelect.selectComments.label": "评论",
    "updateSidebarSelect.selectUpdates.label": "所有更新",
    "updateSidebarTabCommentsSegmentedControl.option.open": "打开",
    "updateSidebarTabCommentsSegmentedControl.option.resolved": "已解决",
    "updateSidebarUnexpandButton.closeSidebar.tooltip": "关闭侧边栏",
    "updateSpaceDomain.error.invalidDomain.message": "此域名不可用。",
    "updateSpaceDomain.error.missingDomain.message": "需要一个域名。",
    "updatesButton.allUpdates.sidebarButton": "所有更新",
    "updatesButton.tooltip": "此工作区中所有页面的更新",
    "updatesModal.allPagesTab.emptyPrompt": "工作区中页面的更新将显示在这里。",
    "updatesModal.allPagesTab.emptyPromptTitle": "没有新的更新",
    "updatesModal.allUpdatesTab.title": "全部",
    "updatesModal.archiveTab.emptyPrompt":
      "你归档的所有收件箱更新都将显示在这里。",
    "updatesModal.archiveTab.emptyPromptTitle": "没有已归档的更新",
    "updatesModal.archiveTab.title": "已归档",
    "updatesModal.currentPageTab.emptyPrompt":
      "对此页面的任何更改都将显示在这里。",
    "updatesModal.currentPageTab.emptyPromptTitle": "没有页面更新",
    "updatesModal.followedUpdatesTab.allArchived":
      "在任何页面的“更新”菜单中打开“关注此页面”，即可在这里接收更新。",
    "updatesModal.followedUpdatesTab.allArchivedTitle": "没有新的更新",
    "updatesModal.followedUpdatesTab.title": "正在关注",
    "updatesModal.mentionsTab.title": "收件箱",
    "updatesModal.mobileMenu.title": "所有更新",
    "updatesModal.mobileThisPage.title": "此页面",
    "updatesModal.openNotifications.tooltip": "打开通知设定",
    "updatesModal.spaceUpdatesTab.allArchived":
      "当有人@提及你、回复你的评论或邀请你进入页面时，你将在这里收到通知。",
    "updatesModal.spaceUpdatesTab.allArchivedRequests":
      "当有人@提及你、回复你的评论、向你发送请求或邀请你进入页面时，你将在这里收到通知。",
    "updatesModal.spaceUpdatesTab.allArchivedTitle": "都看完啦！",
    "updatesModal.spaceUpdatesTab.archiveAllButtonTitle": "全部归档",
    "updatesModal.spaceUpdatesTab.archiveReadButtonTitle": "归档阅读",
    "updatingSubscriptionDetails.restrictedRegion.genericErrorMessage":
      "我们目前不允许此司法管辖区的客户升级其订阅。",
    "updatingSubscriptionDetails.restrictedRegion.newSubscriptionErrorMessage":
      "我们目前不接受来自该司法管辖区的新客户。",
    "upgradeButton.business.text": "商业版",
    "upgradeButton.enterprise.text": "企业版",
    "upgradeButton.learnMore.tooltip": "点击以了解更多。",
    "upgradeButton.personal.text": "个人专业版",
    "upgradeButton.team.text": "团队版",
    "upgradeButton.upgrade.tooltip": "升级以使用此功能。",
    "upgradeMobileButton.upgradeButton.label": "升级到专业版",
    upgradeToBusinessBadge: "商业版",
    upgradeToBusinessForPrivateTooltip: "升级到商业版以启用私人团队",
    upgradeToEnterpriseBadge: "企业版",
    upgradeToEnterpriseForPrivateTooltip: "升级到企业版以启用私人团队",
    "uploadActions.uploadFailedError.message": "上传失败。",
    "uploadLimitExceededBanner.message":
      "{shouldShowShortMessage, select, true {文件超出 {maxFreeAccountFileSize}MB 大小限制} other {你的文件超过了免费版的 {maxFreeAccountFileSize}MB 大小限制}}",
    "uploadLimitExceededBanner.upgradeButton.label":
      "{shouldShowShortMessage, select, true {升级} other {升级以获得无限上传}}",
    "upsellActions.confirmProration.acceptLabel":
      "升级到{plan, select, personal {个人版} team {团队版} business {商业版} other {企业版}}",
    "upsellActions.confirmProration.message":
      "你将以每位成员每月 {price} 的价格订阅 Notion {plan, select, personal {个人版} team {团队版} business {商业版} other {企业版}}。{br}{isSubscribed, select, true {系统将在扣除帐户余额后，按比例向你收取费用。} other {}}",
    "upsellActions.switchPlanFromInAppPurchase":
      "你目前通过 Apple 的应用内购买进行订阅。要切换计划，请先取消你的 Apple 订阅。",
    "upsellCallout.learnMoreButton.text": "了解更多",
    "upsellCallout.upgradeButton.text": "升级",
    "useCaseOnboarding.mobileEditorSidebarStep.description":
      "你将在这里找到工作区页面和你的私人页面。",
    "useCaseOnboardingStep.cancelButton.label": "取消",
    "useCasemobileDesktopStep.browser.label": "浏览器",
    "useCasemobileDesktopStep.desktopApp.label": "Mac&Windows应用程序",
    "useCasemobileDesktopStep.title":
      "Notion也适用于<boldtext>Mac</boldtext>、<boldtext>Windows</boldtext>和<boldtext>浏览器</boldtext>！页面内容在所有设备上同步。",
    "useCasemobileEditorSidebarStep.description":
      "您可以在此处查看工作区页面和部门页面。",
    "useCasemobileEditorSidebarStep.title":
      "<boldtext>侧栏菜单</boldtext>，可实现系统化的工作整理。",
    "useCasemobileEditorStep.description":
      "要重新排列内容，请<boldtext>长触摸</boldtext>。",
    "useCasemobileEditorStep.title": "一些必要的提示：",
    "useCasemobileWebClipperStep.title":
      "<boldtext>请将网页或本地文件保存到Notion。</boldtext>",
    "useCasewebClipperStep.description":
      "点击“共享”按钮，然后选择要保存的页面或数据库。",
    "userConnectionsSettings.actionMenu.connectAccount.label": "绑定另一个帐户",
    "userConnectionsSettings.actionMenu.disconnectAccount.label":
      "断开帐户连接",
    "userConnectionsSettings.actionMenu.pagePicker.cancel": "取消",
    "userConnectionsSettings.actionMenu.pagePicker.title":
      "允许“{connectionName}”访问这些页面",
    "userConnectionsSettings.actionMenu.pagePicker.update": "更新访问权限",
    "userConnectionsSettings.actionMenu.selectPages.label": "访问选定的页面",
    "userConnectionsSettings.connectionsTable.accessColumn.external":
      "可以{capabilities}",
    "userConnectionsSettings.connectionsTable.accessColumn.googleDrive":
      "可以嵌入内容",
    "userConnectionsSettings.connectionsTable.accessColumn.legacyImporter":
      "只能添加页面",
    "userConnectionsSettings.connectionsTable.accessColumn.title": "访问权限",
    "userConnectionsSettings.connectionsTable.accessColumn.userGuest":
      "可以{capabilities}内容",
    "userConnectionsSettings.connectionsTable.botAccess.insertContent": "插入",
    "userConnectionsSettings.connectionsTable.botAccess.previewLinks":
      "预览链接",
    "userConnectionsSettings.connectionsTable.botAccess.readContent": "查看",
    "userConnectionsSettings.connectionsTable.botAccess.syncDatabases":
      "同步数据库",
    "userConnectionsSettings.connectionsTable.botAccess.updateContent": "更新",
    "userConnectionsSettings.connectionsTable.connectionsColumn.title": "连接",
    "userConnectionsSettings.deleteExternalAuthorization.confirmDelete.label":
      "是",
    "userConnectionsSettings.deleteExternalAuthorization.withoutAccountName.confirmationMessage":
      "确定要撤销此帐户的访问权限吗？",
    "userCreditSettings.creditBalanceSection.applyCreditButton.label":
      "使用积分",
    "userCreditSettings.creditBalanceSection.creditBalanceMessage":
      "你目前的积分余额为 {creditBalance}。",
    "userCreditSettings.creditBalanceSection.freeMonthMessage":
      "{numberOfMonths, plural, other {这相当于<b> {numberOfMonths} 个月</b>的个人专业版。}}",
    "userCreditSettings.creditBalanceSection.maximumCreditBalanceExceeded":
      "你已经超出了每个帐户的最高积分总额 {maximumCreditBalance}。你赚取的额外积分不会增加你的余额。",
    "userCreditSettings.creditBalanceSection.title": "积分余额",
    "userCreditSettings.creditBalanceSection.upgradeForFreeButton.label":
      "免费升级",
    "userCreditSettings.helpButton.caption": "了解如何赚取和使用积分",
    "userCreditSettings.inviteFriendsSection.showLessReferredUsers.link":
      "少显示 {numberOfReferredUsers} 位",
    "userCreditSettings.inviteFriendsSection.showMoreReferredUsers.link":
      "显示其他 {numberOfReferredUsers} 位",
    "userCreditSettings.inviteFriendsSection.sourceOfReferralNote":
      "（已邀请你）",
    "userCreditSettings.inviteFriendsSection.title": "邀请朋友并赚取积分",
    "userCreditSettings.inviteFriendsSection.userHasAlreadySignedUpNote":
      "（已注册）",
    "userCreditSettings.inviteFriendsSection.userHasNotSignedUpNote":
      "（尚未注册）",
    "userCreditSettings.offline.message": "请连接网络以管理帐户积分。",
    "userCreditSettings.otherWaysToEarnCreditSection.desktopApp.actionLink":
      "下载",
    "userCreditSettings.otherWaysToEarnCreditSection.desktopApp.description":
      "下载桌面应用并登录",
    "userCreditSettings.otherWaysToEarnCreditSection.desktopApp.title":
      "在桌面应用中登录",
    "userCreditSettings.otherWaysToEarnCreditSection.evernoteImport.actionLink":
      "绑定",
    "userCreditSettings.otherWaysToEarnCreditSection.evernoteImport.description":
      "导入你的笔记和笔记本",
    "userCreditSettings.otherWaysToEarnCreditSection.evernoteImport.title":
      "从 Evernote 导入",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileApp.actionLink":
      "下载",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileApp.description":
      "下载移动应用并登录",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileApp.title":
      "在移动应用中登录",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileShare.actionLink":
      "下载",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileShare.description":
      "使用分享菜单将链接保存到 Notion 中",
    "userCreditSettings.otherWaysToEarnCreditSection.mobileShare.title":
      "使用 iOS 或安卓系统分享菜单",
    "userCreditSettings.otherWaysToEarnCreditSection.totalCreditSummaryText":
      "赚取的总积分",
    "userCreditSettings.otherWaysToEarnCreditSection.webApp.actionLink": "访问",
    "userCreditSettings.otherWaysToEarnCreditSection.webApp.description":
      "从任何网页浏览器登录到 Notion",
    "userCreditSettings.otherWaysToEarnCreditSection.webApp.title":
      "在网页版登录",
    "userCreditSettings.otherWaysToEarnCreditSection.webClipper.actionLink":
      "安装",
    "userCreditSettings.otherWaysToEarnCreditSection.webClipper.description":
      "下载 Chrome 扩展程序并保存链接",
    "userCreditSettings.otherWaysToEarnCreditSection.webClipper.title":
      "使用网页剪裁器",
    "userCreditSettings.otherWaysToEarnCreditSectionAlt.title":
      "赚取积分的方法",
    "userDataConsent.render.error": "出了些问题",
    "userDataConsentSettings.accessGranted.label":
      "你已授予 Notion 访问你的帐户的权限，仅以用于支持目的，直到{expiryTime}。",
    "userDataConsentSettings.accessNotGranted.label":
      "授予 Notion 支持人员对你的帐户的临时访问权限，以便我们代表你解决问题或恢复内容。你可以随时撤销访问权限。",
    "userDataConsentSettings.allowSupportAccess.button": "授予支持访问权限",
    "userDataConsentSettings.header.label": "支持访问权限",
    "userDataConsentSettings.revokeSupportAccess.button": "撤消访问权限",
    "userPermissionsMenu.adminItem.caption":
      "可以更改工作区设置并邀请新成员加入工作区。",
    "userPermissionsMenu.adminItem.label": "管理员",
    "userPermissionsMenu.canCommentItem.caption":
      "可以查看和评论，但无法编辑。",
    "userPermissionsMenu.canCommentItem.label": "可以评论",
    "userPermissionsMenu.canEditContentItem.caption":
      "可以编辑内容，但不能编辑数据库的视图或结构。",
    "userPermissionsMenu.canEditContentItem.label": "可以编辑内容",
    "userPermissionsMenu.canEditItem.caption": "可以编辑，但无法与他人分享。",
    "userPermissionsMenu.canEditItem.label": "可以编辑",
    "userPermissionsMenu.canReadItem.caption": "无法编辑或与他人分享。",
    "userPermissionsMenu.canReadItem.label": "可以查看",
    "userPermissionsMenu.canWriteItem.caption": "无法读取或与他人分享。",
    "userPermissionsMenu.canWriteItem.label": "可以写入。",
    "userPermissionsMenu.disabledItem.label": "禁用",
    "userPermissionsMenu.downgradePermissionsModal.downgradeSelfButton.label":
      "降级",
    "userPermissionsMenu.downgradePermissionsModal.downgradeSelfFromWorkspaceOrPage.confirmationMessage":
      "确定要降级自己的访问权限吗？",
    "userPermissionsMenu.fullAccessItem.caption": "可以编辑并与他人分享。",
    "userPermissionsMenu.fullAccessItem.label": "全部权限",
    "userPermissionsMenu.guestItem.label": "访客",
    "userPermissionsMenu.leaveWorkspaceItem.label": "离开工作区",
    "userPermissionsMenu.memberItem.caption":
      "无法更改工作区设置或邀请新成员加入工作区。",
    "userPermissionsMenu.memberItem.label": "成员",
    "userPermissionsMenu.membershipAdminItem.caption":
      "可以管理工作区和组成员资格。",
    "userPermissionsMenu.membershipAdminItem.label": "成员资格管理员",
    "userPermissionsMenu.mixedAccessItem.caption": "具有混合访问权限。",
    "userPermissionsMenu.mixedAccessItem.label": "混合访问权限",
    "userPermissionsMenu.mobile.doneButton.label": "完成",
    "userPermissionsMenu.mobile.title": "选择团队空间角色",
    "userPermissionsMenu.noAccessItem.label": "无法访问",
    "userPermissionsMenu.removeFromWorkspaceItem.label": "从工作区移除",
    "userPermissionsMenu.removePermissionsModal.removeSelfButton.label": "删除",
    "userPermissionsMenu.removePermissionsModal.removeSelfFromPage.confirmationMessage":
      "确定要删除自己的访问权限吗？",
    "userPermissionsMenu.removePermissionsModal.removeSelfFromWorkspace.confirmationMessage":
      "确定要删除自己的访问权限吗？你将无法访问工作区，并且所有私人页面都将丢失。",
    "userPermissionsMenu.removePermissionsModal.removeUserButton.label": "移除",
    "userPermissionsMenu.removePermissionsModal.removeUserFromPage.confirmationMessage":
      "确定要移除此人？",
    "userPermissionsMenu.removePermissionsModal.removeUserFromWorkspace.confirmationMessage":
      "确定要移除此人？他将无法访问工作区，并且所有私人页面都将丢失。",
    "userPermissionsMenu.removeWorkspaceItem.label": "移除",
    "userPermissionsMenu.workspaceOwnerItem.caption":
      "可以更改工作区设置并邀请新成员加入工作区。",
    "userPermissionsMenu.workspaceOwnerItem.label": "工作区所有者",
    "userSettings.userType.personal": "只有我",
    "userSettings.userType.team1000+": "1000人以上",
    "userSettings.userType.team101-1000": "101人~1000人",
    "userSettings.userType.team2-50": "2人~50人",
    "userSettings.userType.team51-100": "51人~100人",
    "userTypeTooltip.generalPerson": "此人员",
    "verifyDomainModal.addNewDomain.integration.subtitle":
      "链接预览集成必须{br}在发布之前验证域名。",
    "verifyDomainModal.addNewDomain.next": "下一步",
    "verifyDomainModal.addNewDomain.samlConfig.subtitle":
      "具有已验证域名的用户可以{br}使用 SAML 单点登录。",
    "verifyDomainModal.addNewDomain.subtitle":
      "具有已验证域名的用户可以{br}使用 SAML 单点登录。",
    "verifyDomainModal.addNewDomain.title": "添加新域名",
    "verifyDomainModal.editSamlConfig.copy": "拷贝",
    "verifyDomainModal.invalidDomain.expired": "此域名的验证码已过期。",
    "verifyDomainModal.invalidDomain.invalid":
      "你无法验证此域名，因为它已由另一个工作区验证。",
    "verifyDomainModal.invalidDomain.okay": "好的",
    "verifyDomainModal.invalidDomain.title": "无法验证 {domain}",
    "verifyDomainModal.verifiedDomain.integration.subtitle":
      "此集成可以展开包含此域名的 URL。",
    "verifyDomainModal.verifiedDomain.okay": "好的",
    "verifyDomainModal.verifiedDomain.samlConfig.subtitle":
      "用户可以使用此电子邮件域名{br}通过SAML 单点登录。",
    "verifyDomainModal.verifiedDomain.subtitle":
      "用户可以使用此电子邮件域名{br}通过SAML 单点登录。",
    "verifyDomainModal.verifiedDomain.title": "已成功验证 {domain}",
    "verifyDomainModal.verifyExistingDomain.copy": "拷贝",
    "verifyDomainModal.verifyExistingDomain.instructionsDNS":
      "导航到你的域名主机的 DNS 记录部分。",
    "verifyDomainModal.verifyExistingDomain.instructionsHangTight":
      "通常，此更改只需几分钟即可生效，但是，在某些情况下，DNS 记录可能需要长达 72 小时才能传播。",
    "verifyDomainModal.verifyExistingDomain.instructionsTXT":
      "创建新的 TXT 记录，并将其作为值粘贴到上面的代码中。",
    "verifyDomainModal.verifyExistingDomain.instructionsVerify":
      "点击“验证”以通知 Notion 检查你的 DNS 记录。",
    "verifyDomainModal.verifyExistingDomain.subtitle":
      "请按照以下步骤完成验证。",
    "verifyDomainModal.verifyExistingDomain.title": "验证你的域名",
    "verifyDomainModal.verifyExistingDomain.verificationCodeExpiresAt":
      "{timeLeft} 后过期",
    "verifyDomainModal.verifyExistingDomain.verificationCodeLabel": "验证码",
    "verifyDomainModal.verifyExistingDomain.verify": "验证",
    "videoBlock.embedVideo.button.label": "嵌入视频",
    "videoBlock.linkInput.caption": "适用于 YouTube、Vimeo 等视频链接",
    "videoBlock.linkInput.placeholder": "粘贴视频链接…",
    "videoBlock.placeholder": "嵌入或上传视频",
    "viewMoreOutlinerButton.inlineOverflowButtonText": "查看全部 ({total})",
    "viewMoreOutlinerButton.label": "查看全部 ({total})",
    "viewMoreOutlinerButton.labelv2": "另外 {total} 个",
    "viewsIntroModal.doneMessage": "明白了",
    "viewsIntroModal.learnMoreUrl": "访问 {url} 了解更多",
    "viewsIntroModal.mobileDoneMessage": "明白了",
    "viewsIntroModal.skipMessage": "全部跳过",
    "viewsIntroModal.subtitle": "Notion 2.15 的新特性",
    "viewsIntroModal.tab1.subtitle": "现在，只需单击一下即可获得自定义视图。",
    "viewsIntroModal.tab1.title": "用标签发现和切换视图",
    "viewsIntroModal.tab2.subtitle":
      "更改团队的共享数据库视图，不会中断其他人的工作流。",
    "viewsIntroModal.tab2.title": "在保存之前，筛选器和排序不会影响其他人",
    "viewsIntroModal.tab3.subtitle":
      "包括跨多个页面的同一数据库的视图，根据你的需要进行自定义。",
    "viewsIntroModal.tab3.title": "从现有数据库创建视图",
    "viewsIntroModal.title": "更好的数据库和筛选器",
    "webApp.redirectingToDesktop.continueInBrowser.message":
      "或者在浏览器中继续",
    "webApp.redirectingToDesktop.directLink.message":
      "如果你没有被重定向，请单击此处。",
    "webApp.redirectingToDesktop.message": "重定向到你的 Notion 应用…",
    "webClipper.clippedItemDatabase.properties.createdTime": "创建时间",
    "webClipper.clippedItemDatabase.properties.name": "名称",
    "webClipper.clippedItemDatabase.properties.tags": "标签",
    "webClipper.clippedItemDatabase.properties.url": "网址",
    "webClipper.clippedItemDatabase.views.viewAll": "查看所有",
    "whatIsNotion.usecases.databases": "数据库",
    "whatIsNotion.usecases.documents": "文档",
    "whatIsNotion.usecases.knowledgeBases": "知识库",
    "whatIsNotion.usecases.notes": "世界上最美的笔记... 😉",
    "whatIsNotion.usecases.projectManagementSystems": "项目管理系统",
    "whatIsNotion.usecases.publicWebsites": "公共网站",
    "whimsicalBlock.embeds.button.label": "嵌入 Whimsical",
    "whimsicalBlock.embeds.caption": "适用于启用了公共访问的 Whimsical 链接",
    "whimsicalBlock.placeholder": "嵌入 Whimsical",
    "withImageRepositioning.dragImage.text": "拖动图片以调整位置",
    "workspaceTransferErrors.failedTransfer.errorMessages":
      "移动工作区失败。请再试一次。",
    "workspaceTransferErrors.invalidCorporateEmail.errorMessages":
      "无法将工作区转移到公司用户帐户。",
    "workspaceTransferErrors.reattemptWrongUser.errorMessages":
      "不允许重新尝试转移到不同的用户帐户。",
  });

  const routes = document.createElement("script");
  routes.id = "routes";
  routes.type = "application/json";
  routes.setAttribute("data-locale", lang);
  routes.text = JSON.stringify({});

  function insertMoment() {
    try {
      moment.updateLocale(lang.toLowerCase(), {
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日Ah点mm分",
          LLLL: "YYYY年M月D日ddddAh点mm分",
          l: "YYYY/M/D",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日dddd HH:mm",
        },
      });
      moment.locale(lang.toLowerCase());
    } catch (e) {
      requestAnimationFrame(() => {
        insertMoment();
      });
    }
  }

  try {
    const preferredLocaleStr = window.localStorage.getItem(
      "LRU:KeyValueStore2:preferredLocale"
    );
    const preferredLocale = JSON.parse(preferredLocaleStr);
    if (preferredLocale.value) {
      preferredLocale.value = lang;
      window.localStorage.setItem(
        "LRU:KeyValueStore2:preferredLocale",
        JSON.stringify(preferredLocale)
      ); // search window.document.querySelector("#messages") 请阅读
    }
  } catch (e) {}

  if (isElectron) {
    var observer = new MutationObserver(function (callback) {
      if (
        callback.filter((v) => {
          return v.target === document.head;
        }).length > 0
      ) {
        document.head.insertAdjacentElement("afterbegin", script);
        document.head.insertAdjacentElement("afterbegin", routes);
        observer.disconnect();
      }
    });
    observer.observe(document, {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      attributes: false, // 观察属性变动
      subtree: true, // 观察后代节点，默认为 false
    });
    insertMoment();
  } else {
    function insert() {
      try {
        document.body.appendChild(script);
        document.body.appendChild(routes);
      } catch (e) {
        requestAnimationFrame(() => {
          insert();
        });
      }
    }
    insert();
    insertMoment();

    // for UserScript
    if (isSafari) {
      const notionRoot = document.createElement("div");
      notionRoot.id = "notion-app";
      notionRoot.setAttribute("data-inject", true);
      document.body.append(notionRoot);
      scriptSrcList.forEach((url) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.defer = "defer";
        script.src = url;
        script.setAttribute("data-inject", true);
        document.head.append(script);
      });
      if (!window.__console || !window.__console.push) {
        window.__console = {
          push: (msg) => {
            
          }
        }
      }
    }
  }
})();

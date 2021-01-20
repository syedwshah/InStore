import { NavigationActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(ref) {
	_navigator = ref;
}

function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function back() {
	_navigator.dispatch(NavigationActions.back());
}

function popToTop(immediate = true) {
	_navigator.dispatch({
		type: NavigationActions.POP_TO_TOP,
		immediate,
	});
}

function reset({ action, index }) {
	_navigator.dispatch({
		type: NavigationActions.RESET,
		index,
		actions,
	});
}

// Takes in the navigation.state (obtained from props) and returns navigation.state.routeName 
function getCurrentRouteName(navigationState) {
	if(!navigationState) {
		return null;
	}

	const route = navigationState.routes[navigationState.index];

	if(route.routes) {
		return getCurrentRouteName(route);
	}

	return route.routeName;
}

export const NavigationService = {
	navigate,
	setTopLevelNavigator,
	back,
	popToTop,
	reset,
	navigator: _navigator,
	getCurrentRouteName,
};

window.NavigationService = NavigationService;

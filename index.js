const swapRenderer = (newType) => {
	if (newType === 'react') {
		console.info("swapping view layer to react");
		$("#__blaze-root").hide()
		try {
			BlazeLayout.reset()
		} catch (error) {
			// fail silently
		}
		$("#__react-root").show()
	} else if (newType === 'blaze') {
		console.info("swapping view layer to blaze");
		$("#__react-root").hide()
		try {
			const ele = document.getElementById('__react-root')
			ReactDOM.unmountComponentAtNode(ele)
		} catch (error) {
			// fail silently
		}
		$("#__blaze-root").show()
	}

}

// add a trigger to check
const appRoutes = FlowRouter.group({
	name: 'mainAppRoutes',
	triggersEnter: [function (context, redirect) {
		const newType = context.route.options.renderType
		const oldType = context.oldRoute && context.oldRoute.options && context.oldRoute.options.renderType
		if (newType !== oldType && typeof oldType !== 'undefined') {
			swapRenderer(newType)
		}
  }]
})

// In a route
appRoutes.route('/', {
	name: 'walletStart',
	action() {
		mounter(BareLayoutBranded, {
      content: () => (<StartScreen/>)
    });
  },
	renderType: 'react' // set to 'blaze' if using Blaze for this route
})

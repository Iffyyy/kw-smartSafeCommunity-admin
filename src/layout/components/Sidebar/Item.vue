<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, path } = context.props
    const vnodes = []
    const iconName=context.parent.$route.path===path?`${icon}_a`:icon

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }else{
      vnodes.push(<span class="sidebar-circle"/>)
    }

    if (title) {
      vnodes.push(<span slot='title' class="sidebar-text">{(title)}</span>)
    }
    return vnodes
  }
}
</script>

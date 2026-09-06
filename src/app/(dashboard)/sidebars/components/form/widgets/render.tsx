import { useSortable } from '@dnd-kit/react/sortable';

import type { SidebarsFormWidgets } from '../../../schemas/form/widgets/widgets.schema';
import { sidebarsFormWidgetsRegistry } from './registry';
import SidebarsFormWidgetsRenderWrapper from './wrapper';

export default function SidebarsFormWidgetsRender({ widget, index }: { widget: SidebarsFormWidgets; index: number }) {
  const { ref: blockDragRef, handleRef: blockDragHandleRef } = useSortable({
    id: widget.id,
    index,
  });

  switch (widget.type) {
    case 'about': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.about.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'instagram': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.instagram.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'newsletter': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.newsletter.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'posts': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.posts.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'products': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.products.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'promoBox': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.promoBox.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'search': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.search.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'social': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.social.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }

    case 'tags': {
      const WidgetRenderTemplate = sidebarsFormWidgetsRegistry.tags.render;

      return (
        <SidebarsFormWidgetsRenderWrapper
          widget={widget}
          blockDragRef={blockDragRef}
          blockDragHandleRef={blockDragHandleRef}
        >
          <WidgetRenderTemplate {...widget} />
        </SidebarsFormWidgetsRenderWrapper>
      );
    }
  }
}


/**
 * Analytics tracking for performance optimization insights
 */
class AnalyticsTracker {
  private events: Array<{ event: string; category: string; data: any; timestamp: number }> = [];
  private readonly MAX_EVENTS = 1000;

  track(category: string, event: string, data: any = {}): void {
    this.events.push({
      event,
      category,
      data,
      timestamp: Date.now()
    });

    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events.shift();
    }

    // Log for debugging
    console.log(`📊 Analytics: ${category}/${event}`, data);
  }

  getAnalyticsSummary(): { total_events: number; categories: Record<string, number> } {
    const categories: Record<string, number> = {};
    
    this.events.forEach(event => {
      categories[event.category] = (categories[event.category] || 0) + 1;
    });

    return {
      total_events: this.events.length,
      categories
    };
  }

  getRecentEvents(limit: number = 10): Array<{ event: string; category: string; data: any; timestamp: number }> {
    return this.events.slice(-limit);
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const analyticsTracker = new AnalyticsTracker();
